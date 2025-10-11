import type { FC } from "react";
import { Container } from "@mui/material";
import { AllArticles, Header } from "components";
import { useGetArticlesQuery } from "store/services/articlesApi";

const Home: FC = () => {
  const { data } = useGetArticlesQuery();

  return (
    <>
      <Header />
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AllArticles data={data} />
      </Container>
    </>
  );
};

export default Home;
