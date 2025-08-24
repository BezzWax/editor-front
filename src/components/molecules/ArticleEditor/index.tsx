/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, useMemo } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Box, Button, Typography } from "@mui/material";

const ArticleEditor: FC = () => {
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      const quill = (window as any).quillRef;
      const range = quill.getSelection(true);
      const imageUrl = data.url || data.path || ""; // подставь, что реально возвращает сервер

      if (imageUrl) {
        quill.insertEmbed(range.index, "image", imageUrl, "user");
        quill.setSelection(range.index + 1);
      } else {
        alert("Ошибка загрузки изображения");
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote", "code-block"],
          ["link", "image", "video"],
          [{ align: [] }],
          [{ color: [] }, { background: [] }],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Редактор статьи
      </Typography>
      {!preview ? (
        <ReactQuill
          value={content}
          onChange={setContent}
          modules={modules}
          theme="snow"
          style={{ height: 300 }}
          ref={(el) => {
            if (el) (window as any).quillRef = el.getEditor();
          }}
        />
      ) : (
        <Box
          sx={{
            border: "1px solid #ccc",
            p: 2,
            borderRadius: 1,
            minHeight: 300,
            backgroundColor: "#fafafa",
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}

      <Box sx={{ display: "flex", gap: 2, mt: 10 }}>
        <Button variant="contained" onClick={() => console.log(content)}>
          Сохранить
        </Button>
        <Button variant="outlined" onClick={() => setPreview((p) => !p)}>
          {preview ? "Редактировать" : "Предпросмотр"}
        </Button>
      </Box>
    </Box>
  );
};

export default ArticleEditor;
