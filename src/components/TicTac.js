// @flow
import React from "react";
import { connect } from "react-redux";
import Cell from "./Cell";
import Picker from "./Picker";
import Page2 from "./Page2";
import {
  pickUser,
  changePage,
  makeSelection,
  reset,
  userWinnerSelector,
  compWinnerSelector,
  drawSelector,
  randomBeginner
} from "../reduxStore";

type CellObj = {
  id: number,
  user: string
};

type Props = {
  cells: Array<CellObj>,
  users: Array<string>,
  onPick: (str: string) => void,
  onChangePage: (num: number, per: string) => void,
  userSelect: (num: number, user: string, userWinner: boolean) => void,
  onReset: () => void,
  page: number,
  user: string,
  compUser: string,
  userWinner: boolean,
  compWinner: boolean,
  isDraw: boolean,
  randomBeginner: string
};

const TicTac = ({
  cells,
  users,
  onPick,
  page,
  onChangePage,
  userSelect,
  onReset,
  user,
  userWinner,
  compWinner,
  isDraw,
  randomBeginner
}: Props) => {
  return (
    <div>
      <h2 style={{ paddingTop: "30px", fontSize: "40pt" }}> Tic Tac Toe </h2>

      {page === 3 && <button onClick={onReset}> Reset </button>}

      {page === 2 && (
        <Page2 beginner={randomBeginner} onChangePage={onChangePage} />
      )}

      {page === 1 && <Picker users={users} pickUser={onPick} />}
      {page === 3 && (
        <React.Fragment>
          <div className="cell-container">
            {cells.map(cell => (
              <Cell
                key={cell.id}
                user={user}
                cell={cell.user}
                index={cell.id}
                userWinner={userWinner}
                disabled={cell.user !== ""}
                userSelect={userSelect}
              />
            ))}
          </div>
          {userWinner && (
            <div className="winner">
              <div className="winner-inner">User Wins</div>
            </div>
          )}
          {compWinner && (
            <div className="winner">
              <div className="winner-inner">Computer Wins</div>
            </div>
          )}

          {isDraw && (
            <div className="winner">
              <div className="winner-inner">Its a Draw</div>
            </div>
          )}
        </React.Fragment>
      )}

      <footer>
        <small>
          <em> By Tsitsi Melody Mandizvidza </em>
        </small>
      </footer>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    cells: state.cells,
    users: state.users,
    user: state.user,
    compUser: state.compUser,
    page: state.page,
    userWinner: userWinnerSelector(state),
    compWinner: compWinnerSelector(state),
    isDraw: drawSelector(state),
    randomBeginner: randomBeginner(state)
    // compUser: compUserSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPick: str => dispatch(pickUser(str)),
    onChangePage: (num, ber) => dispatch(changePage(num, ber)),
    userSelect: (num, user, isWinner) =>
      dispatch(makeSelection(num, user, isWinner)),
    onReset: () => dispatch(reset())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicTac);
