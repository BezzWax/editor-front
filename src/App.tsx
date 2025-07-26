import { RoutesWrapper } from "./libraries/router";
import type { FC } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "store";

const App: FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RoutesWrapper />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
