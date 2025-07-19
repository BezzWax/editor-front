import { RoutesWrapper } from './libraries/router'
import type { FC } from "react";
import { BrowserRouter } from "react-router-dom";

const App: FC = () => {
  return (
    <BrowserRouter>
      <RoutesWrapper />
    </BrowserRouter>
  );
};

export default App;
