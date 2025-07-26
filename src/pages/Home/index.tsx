import type { FC } from "react"
import { Container } from "@mui/material"
import { Header } from "components"

const Home: FC = () => {
  return (
    <>
      <Header />
      <Container maxWidth="md">
        <h1>Главная страница</h1>
        <p>Добро пожаловать в наш редактор!</p>
      </Container>
    </>
  )
}

export default Home
