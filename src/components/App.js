// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import Cell from "./Cell";
import Picker from "./Picker";

type Winner = Array<number>;

type State = {
  page: number,
  cells: Array<string>,
  freeCells: Array<number>,
  users: Array<string>,
  compUser: string,
  user: string,
  winningCombinations: Array<Winner>,
  winner: string,
  draw: boolean
};

const InitialState = {
  page: 1,
  cells: ["", "", "", "", "", "", "", "", ""],
  freeCells: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  users: ["X", "O"],
  winningCombinations: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ], // changed the iwinning combination numbers to plus one because 0 index always returned falsy
  compUser: "",
  user: "",
  winner: "",
  draw: false
};

class App extends Component<{}, State> {
  state = InitialState;

  makeSelection = (user: string, pick: number) => {
    this.setState(prev => {
      const newCells = prev.cells.map((c, i) => {
        if (i === pick) {
          return user;
        }

        return c;
      });

      const removeFree = prev.freeCells.filter(c => c !== pick);
      const isDraw = this.checkDraw(removeFree);

      if (isDraw) {
        return { draw: true, cells: newCells };
      }

      const isWinner = this.checkWinner(newCells, user);

      if (isWinner) {
        return { winner: user, cells: newCells };
      }

      return { cells: newCells, freeCells: removeFree };
    });
  };

  userSelect = (index: number) => {
    const { user } = this.state;
    this.makeSelection(user, index);

    setTimeout(() => {
      this.compSelect();
    }, 1500);
  };

  compSelect = () => {
    const { compUser, freeCells, winner } = this.state;
    if (freeCells.length === 0) {
      return;
    }

    if (winner.length) {
      return;
    }

    const pick = Math.floor(Math.random() * (freeCells.length - 1));
    const picked = freeCells[pick];

    this.makeSelection(compUser, picked);
  };

  onReset = () => {
    this.setState(InitialState);
  };

  checkWinner = (cells: Array<string>, user: string) => {
    const { winningCombinations } = this.state;

    const userIndexes = cells
      .map((cell, i) => {
        if (cell === user) {
          return i + 1;
        }

        return null;
      })
      .filter(x => x);

    const isWinner = winningCombinations.map(comb => {
      return comb
        .map(ini => userIndexes.includes(ini))
        .some(element => element === false);
    });

    return isWinner.includes(false);
  };

  checkDraw = (freeCells: Array<number>) => {
    const { winner } = this.state;

    if (freeCells.length === 0 && winner.length === 0) {
      return true;
    }

    return false;
  };

  changePage = (num: number) => this.setState({ page: num });
  pickUser = (usr: string) => {
    const { users } = this.state;

    const compUser = users.filter(us => us !== usr);

    this.setState({ user: usr, compUser: compUser[0], page: 2 });
  };

  render() {
    const { cells, page, users, compUser, winner, user } = this.state;
    return (
      <div>
        <h2 style={{ paddingTop: "30px" }}> Tic Tac Toe </h2>
        {page === 1 && <Picker users={users} pickUser={this.pickUser} />}
        {page === 2 && (
          <React.Fragment>
            <button onClick={this.onReset}> Reset </button>
            <div className="cell-container">
              {cells.map((cell, i) => (
                <Cell
                  key={i}
                  cell={cell}
                  index={i}
                  userSelect={this.userSelect}
                  disabled={cell !== ""}
                />
              ))}
            </div>

            {winner && (
              <div className="winner">
                <div className="winner-inner">
                  {winner === compUser && "Computer "}
                  {winner === user && "User "}
                  Wins
                </div>
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tableCells: state.cells,
    users: state.users
  };
};

export default connect(mapStateToProps)(App);
