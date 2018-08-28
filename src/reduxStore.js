/*

  Actions

*/

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
  users: ["X", "O"]
};

export const rootReducer = (state = INITIAL_STATE) => state;

/*

  Selectors

*/
