import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./reduxStore";
import thunk from "redux-thunk";
import "./index.css";
// import App from "./components/App";
import TicTac from "./components/TicTac";
import registerServiceWorker from "./registerServiceWorker";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <TicTac />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
