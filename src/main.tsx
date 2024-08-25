import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { setupStore } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const store = setupStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
