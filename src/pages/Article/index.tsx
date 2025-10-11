import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Paper,
  Container,
  Typography,
  CircularProgress,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { useGetArticleByIdQuery } from "store/services/articlesApi";
import { Comments } from "components";
import { getUserData } from "utils";

const Article: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = getUserData();
  const { data: article, isLoading, error } = useGetArticleByIdQuery(id!);

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !article) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography color="error" variant="h6" align="center">
          {error ? "Error loading article" : "Article not found"}
        </Typography>
      </Container>
    );
  }

  const formattedDate = new Date(article.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const sanitizedContent = DOMPurify.sanitize(article.content);
  const parsedContent = parse(sanitizedContent);

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Button onClick={handleBack} color="inherit">
            Back to articles
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
            backgroundColor: "background.paper",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {article.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              mb: 3,
              color: "text.secondary",
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Typography variant="subtitle1">By {article.author}</Typography>
            <Typography variant="subtitle1">{formattedDate}</Typography>
          </Box>

          <Box
            sx={{
              "& img": {
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
                my: 2,
              },
              "& h1, & h2, & h3": {
                fontWeight: "bold",
                mt: 3,
                mb: 1,
              },
              "& p": {
                lineHeight: 1.6,
                mb: 2,
              },
            }}
          >
            {parsedContent}
          </Box>
        </Paper>
      </Container>

      <Comments articleId={id || ''} currentUserId={user.id} />
    </>
  );
};

export default Article;
