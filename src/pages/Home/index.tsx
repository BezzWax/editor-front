import type { FC } from 'react';
import { Container } from '@mui/material';
import { AllArticles, Header } from 'components';

const Home: FC = () => {
  return (
    <>
      <Header />
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AllArticles />
      </Container>
    </>
  );
};

export default Home;