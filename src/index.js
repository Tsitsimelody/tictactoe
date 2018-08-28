import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./reduxStore";
import "./index.css";
// import App from "./components/App";
import TicTac from "./components/TicTac";
import registerServiceWorker from "./registerServiceWorker";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <TicTac />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
