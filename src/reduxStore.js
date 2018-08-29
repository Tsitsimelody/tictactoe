import { createSelector } from "reselect";

/*

  Action Types

*/

const USER_PICK = "USER_PICK";
const PAGE_NUM = "PAGE_NUM";
const USER_SELECT = "USER_SELECT";
const RESET = "RESET";
const INCREASE_COMP_MOVES = "INCREASE_COMP_MOVES";

/*

  Actions

*/

export const pickUser = str => {
  return {
    type: USER_PICK,
    user: str,
    page: 2
  };
};

export const changePage = num => {
  return {
    type: PAGE_NUM,
    num
  };
};

const onUserSelect = (num, user) => {
  return {
    type: USER_SELECT,
    num,
    user
  };
};

const increaseCompMoves = () => {
  return {
    type: INCREASE_COMP_MOVES
  };
};

export const makeSelection = (num, userCell) => {
  return (dispatch, getState) => {
    const { compUser, user, compMoves, cells } = getState();

    if (user === userCell) {
      dispatch(onUserSelect(num, user));

      const freeCells =
        compMoves === 0
          ? [cells[0], cells[2], cells[4], cells[6], cells[8]].filter(
              cell => cell.status === "free" && cell.id !== num
            )
          : cells.filter(cell => cell.status === "free" && cell.id !== num);

      console.log(freeCells);

      if (freeCells.length) {
        setTimeout(() => {
          compSelection(freeCells, compUser, dispatch);
        }, 1500);
      }
    }

    if (userCell === compUser) {
      dispatch(onUserSelect(num, compUser));
    }
  };
};

const compSelection = (freeCells, compUser, dispatch) => {
  const pick = Math.floor(Math.random() * (freeCells.length - 1));
  const picked = freeCells[pick];

  dispatch(makeSelection(picked.id, compUser));
  dispatch(increaseCompMoves());
};

export const reset = () => {
  return { type: RESET };
};

/*

  Reducers

*/

const INITIAL_STATE = {
  cells: [
    { id: 1, user: "", status: "free" },
    { id: 2, user: "", status: "free" },
    { id: 3, user: "", status: "free" },
    { id: 4, user: "", status: "free" },
    { id: 5, user: "", status: "free" },
    { id: 6, user: "", status: "free" },
    { id: 7, user: "", status: "free" },
    { id: 8, user: "", status: "free" },
    { id: 9, user: "", status: "free" }
  ],
  users: ["X", "O"],
  user: "",
  compUser: "",
  page: 1,
  compMoves: 0,
  winningCombinations: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ]
};

export const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_PICK:
      return {
        ...state,
        user: action.user,
        page: action.page,
        compUser: state.users.filter(usr => usr !== action.user)[0]
      };

    case PAGE_NUM:
      return { ...state, page: action.num };

    case USER_SELECT:
      return {
        ...state,
        cells: state.cells.map(cell => {
          if (cell.id === action.num) {
            return { id: cell.id, user: action.user, status: "done" };
          }

          return cell;
        })
      };

    case RESET:
      return INITIAL_STATE;

    case INCREASE_COMP_MOVES:
      return { ...state, compMoves: state.compMoves + 1 };

    default:
      return state;
  }
};

/*

  Selectors

*/

const userSelector = state => state.user;
const compSelector = state => state.compUser;
const cellsSelector = state => state.cells;
const winningCombinationsSelector = state => state.winningCombinations;

export const userWinnerSelector = createSelector(
  cellsSelector,
  winningCombinationsSelector,
  userSelector,
  (cells, winningCombos, user) => {
    if (user) {
      const userIndexes = cells
        .map(cell => {
          if (cell.user === user) {
            return cell.id;
          }

          return null;
        })
        .filter(x => x);

      const isWinner = winningCombos.map(comb => {
        return comb
          .map(ini => userIndexes.includes(ini))
          .some(element => element === false);
      });

      return isWinner.includes(false);
    }

    return false;
  }
);

export const compWinnerSelector = createSelector(
  cellsSelector,
  winningCombinationsSelector,
  compSelector,
  (cells, winningCombos, user) => {
    if (user) {
      const userIndexes = cells
        .map(cell => {
          if (cell.user === user) {
            return cell.id;
          }

          return null;
        })
        .filter(x => x);

      const isWinner = winningCombos.map(comb => {
        return comb
          .map(ini => userIndexes.includes(ini))
          .some(element => element === false);
      });

      return isWinner.includes(false);
    }

    return false;
  }
);
