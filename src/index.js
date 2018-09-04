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
import {
  checkForWinner,
  updateCells,
  calculateFreeCells,
  compStratergy
} from "./utils";
import { compSelection } from "./reduxStore";

const computer = store => next => action => {
  const {
    user,
    cells,
    winningCombinations,
    compUser,
    compMoves
  } = store.getState();

  if (action.type === "USER_SELECT" && action.user === user) {
    const updatedCells = updateCells(cells, action.num, action.user);
    const isWinner = checkForWinner(updatedCells, winningCombinations, user);

    if (!isWinner) {
      const strategyMove = compStratergy(
        updatedCells,
        winningCombinations,
        user,
        compUser
      );

      let freeCells;

      if (strategyMove.length) {
        freeCells = strategyMove
          .map(move => move.cells)
          .reduce((a, b) => a.concat(b), [])
          .filter((item, index, self) => self.indexOf(item) === index)
          .map(cell => {
            return updatedCells.filter(
              cel => cel.id === cell && cel.status === "free"
            );
          })
          .reduce((a, b) => a.concat(b), []);
      } else {
        freeCells = calculateFreeCells(updatedCells, compMoves, action.num);
      }

      if (freeCells.length) {
        setTimeout(() => {
          compSelection(freeCells, compUser, store.dispatch);
        }, 1500);
      }
    }
  }

  return next(action);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, computer))
);

ReactDOM.render(
  <Provider store={store}>
    <TicTac />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
