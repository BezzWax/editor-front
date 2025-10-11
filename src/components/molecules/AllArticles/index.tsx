import { FC } from "react";
import { Container, Grid, Typography } from "@mui/material";

import { ArticleCard } from "components";

import type { IArticle, TAllArticles } from "./types";

const AllArticles: FC<TAllArticles> = ({ data, loading, error, onChange }) => {
  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error</Typography>;
  if (!data || data.length === 0) return <Typography>No articles</Typography>;

  return (
    <Container sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {data?.map((article: IArticle) => (
          <Grid
            key={article._id}
            onClick={() => onChange && onChange(article._id)}
          >
            <ArticleCard article={article} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AllArticles;
