import { FC } from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import DOMPurify from "dompurify";
import styles from './ArticleCard.module.scss'

interface Article {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const ArticleCard: FC<{ article: Article }> = ({ article }) => {
  const getContentPreview = (html: string) => {
    const sanitized = DOMPurify.sanitize(html);
    const parser = new DOMParser();
    const doc = parser.parseFromString(sanitized, "text/html");

    const textContent = doc.body.textContent?.slice(0, 100) || "";
    const previewText =
      textContent.length > 100 ? textContent + "..." : textContent;

    const imgElement = doc.querySelector("img");
    const imageUrl = imgElement?.src || null;

    return { previewText, imageUrl };
  };

  const { previewText, imageUrl } = getContentPreview(article.content);

  return (
    <Card
      sx={{
        maxWidth: 300,
        maxHeight: 270,
        boxShadow: 3,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
      }}
      className={styles.wrapper}
    >
      {imageUrl ? (
        <CardMedia
          component="img"
          height="150"
          image={imageUrl}
          alt={article.title}
          sx={{ objectFit: "cover", borderRadius: "8px 8px 0 0" }}
        />
      ) : (
        <Box
          sx={{
            height: 150,
            backgroundColor: "grey.200",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px 8px 0 0",
            color: "grey.600",
            fontSize: "14px",
          }}
        >
          Нет изображения
        </Box>
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          {article.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {previewText}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1, display: "block" }}
        >
          Автор: {article.author}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
