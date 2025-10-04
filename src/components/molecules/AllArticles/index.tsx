import { Container, Grid, Typography } from "@mui/material";
import { ArticleCard } from "components";
import { FC } from "react";
import { useGetArticlesQuery } from "store/services/articlesApi";
import { IArticle } from "./types";

const AllArticles: FC = () => {
  const { data: articles, isLoading, error } = useGetArticlesQuery();

  if (isLoading) return <Typography>Загрузка...</Typography>;
  if (error) return <Typography>Ошибка загрузки статей</Typography>;
  if (!articles || articles.length === 0) return <Typography>Статей нет</Typography>;

  return (
    <Container sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {articles.map((article: IArticle) => (
          <Grid key={article._id}>
            <ArticleCard article={article} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AllArticles