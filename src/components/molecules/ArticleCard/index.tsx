import { type FC } from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

import type { IArticleCard } from "./types";
import styles from "./ArticleCard.module.scss";

const ArticleCard: FC<{ article: IArticleCard }> = ({ article }) => {
  const navigate = useNavigate();

  const getContentPreview = (html: string) => {
    const sanitized = DOMPurify.sanitize(html);
    const parser = new DOMParser();
    const doc = parser.parseFromString(sanitized, "text/html");

    const textContent = doc.body.textContent?.slice(0, 30) || "";
    const previewText =
      textContent.length > 50 ? textContent + "..." : textContent;

    const imgElement = doc.querySelector("img");
    const imageUrl = imgElement?.src || null;

    return { previewText, imageUrl };
  };

  const { previewText, imageUrl } = getContentPreview(article.content);

  const handleArticleClick = () => {
    navigate(`/article/${article._id}`);
  };

  return (
    <div onClick={handleArticleClick}>
      <Card
        sx={{
          width: 250,
          height: 240,
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
            height="120"
            image={imageUrl}
            alt={article.title}
            sx={{ objectFit: "cover", borderRadius: "8px 8px 0 0" }}
          />
        ) : (
          <Box
            sx={{
              height: 120,
              backgroundColor: "grey.200",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px 8px 0 0",
              color: "grey.600",
              fontSize: "14px",
            }}
          >
            No image
          </Box>
        )}

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            className={styles.wrapper_title}
            component="p"
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
            Author: {article.author}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleCard;
