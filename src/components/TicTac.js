// @flow
import React from "react";
import { connect } from "react-redux";
import Cell from "./Cell";

type CellObj = {
  id: number,
  user: string
};

type Props = {
  cells: Array<CellObj>,
  users: Array<string>
};

const TicTac = ({ cells, users }: Props) => (
  <div>
    <h2 style={{ paddingTop: "30px" }}> Tic Tac Toe </h2>
    <button> Reset </button>
    <div className="cell-container">
      {cells.map(cell => (
        <Cell
          key={cell.id}
          cell={cell.user}
          index={cell.id}
          disabled={cell.user !== ""}
        />
      ))}
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    cells: state.cells,
    users: state.users
  };
};

export default connect(mapStateToProps)(TicTac);
