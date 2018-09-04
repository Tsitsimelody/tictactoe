import { createSelector } from "reselect";
import { checkForWinner, updateCells } from "./utils";

/******************************************************************************************** 

  Action Types

*/

const USER_PICK = "USER_PICK";
const PAGE_NUM = "PAGE_NUM";
const USER_SELECT = "USER_SELECT";
const RESET = "RESET";
const INCREASE_COMP_MOVES = "INCREASE_COMP_MOVES";

/******************************************************************************************** 

  Actions

*/

export const pickUser = str => {
  return {
    type: USER_PICK,
    user: str,
    page: 2
  };
};

export const changePage = (num, ber) => {
  return {
    type: PAGE_NUM,
    num,
    ber
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

export const makeSelection = (num, userCell, isUserWinner) => {
  return (dispatch, getState) => {
    if (isUserWinner) {
      return null;
    } else {
      const { compUser, user } = getState();

      if (user === userCell) {
        dispatch(onUserSelect(num, user));
      }

      if (userCell === compUser) {
        dispatch(onUserSelect(num, compUser));
      }
    }
  };
};

export const compSelection = (freeCells, compUser, dispatch) => {
  const pick = Math.floor(Math.random() * (freeCells.length - 1));
  const picked = freeCells[pick];

  dispatch(makeSelection(picked.id, compUser));
  dispatch(increaseCompMoves());
};

export const reset = () => {
  return { type: RESET };
};

/******************************************************************************************** 

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
        cells: updateCells(state.cells, action.num, action.user)
      };

    case RESET:
      return INITIAL_STATE;

    case INCREASE_COMP_MOVES:
      return { ...state, compMoves: state.compMoves + 1 };

    default:
      return state;
  }
};

/******************************************************************************************** 

  Selectors

*/

const userSelector = state => state.user;
const usersSelector = state => state.users;
const compSelector = state => state.compUser;
const cellsSelector = state => state.cells;
const winningCombinationsSelector = state => state.winningCombinations;

export const userWinnerSelector = createSelector(
  cellsSelector,
  winningCombinationsSelector,
  userSelector,
  (cells, winningCombos, user) => {
    if (user) {
      return checkForWinner(cells, winningCombos, user);
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
      return checkForWinner(cells, winningCombos, user);
    }

    return false;
  }
);

export const drawSelector = createSelector(
  cellsSelector,
  userWinnerSelector,
  compWinnerSelector,
  (cells, userWinner, compWinner) => {
    const freeCells = cells.filter(cell => cell.status === "free");

    if (freeCells.length) {
      return false;
    } else {
      if (userWinner) {
        return false;
      }

      if (compWinner) {
        return false;
      }

      return true;
    }
  }
);

export const randomBeginner = createSelector(
  usersSelector,
  userSelector,
  compSelector,
  (users, user, compUser) => {
    const num = Math.floor(Math.random() * 2);
    const randomUser = users[num];

    if (randomUser === user) {
      return "User Plays First";
    } else {
      return "Computer Plays First";
    }
  }
);
