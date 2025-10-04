/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, useMemo } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Box, Button, Typography, TextField } from "@mui/material";

import {
  useCreateArticleMutation,
  useUploadImageMutation,
} from "store/services/articlesApi";

import { TArticleEditor } from "./types";
import { getUserData } from "utils";

const ArticleEditor: FC<TArticleEditor> = ({ onChange }) => {
  const user = getUserData();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);

  const [uploadImage] = useUploadImageMutation();
  const [createArticle, { isLoading }] = useCreateArticleMutation();

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

      try {
        const data = await uploadImage(formData).unwrap();
        const quill = (window as any).quillRef;
        const range = quill.getSelection(true);
        quill.insertEmbed(
          range.index,
          "image",
          `http://localhost:3000${data.url}`,
          "user"
        );
        quill.setSelection(range.index + 1);
      } catch (err: any) {
        console.log("Ошибка загрузки изображения", err);
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
        handlers: { image: imageHandler },
      },
    }),
    []
  );

  const handleSave = async () => {
    try {
      await createArticle({ title, content, author: user.username }).unwrap();
      alert("✅ Статья сохранена!");
      setTitle("");
      setContent("");
      onChange();
    } catch (err: any) {
      console.log("❌ Ошибка сохранения статьи", err);
      onChange();
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Редактор статьи
      </Typography>

      <TextField
        fullWidth
        label="Заголовок статьи"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />

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
        <Button variant="contained" onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Сохраняю..." : "Сохранить"}
        </Button>
        <Button variant="outlined" onClick={() => setPreview((p) => !p)}>
          {preview ? "Редактировать" : "Предпросмотр"}
        </Button>
      </Box>
    </Box>
  );
};

export default ArticleEditor;
