import React from "react";
import ReactDOM from "react-dom/client";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import BodyRouter from "./components/BodyRouter";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  return (
    <div>
      <Provider store={appStore}>
        <BodyRouter />
      </Provider>
    </div>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />);
