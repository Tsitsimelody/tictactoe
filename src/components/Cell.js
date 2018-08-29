// @flow
import React from "react";

type Props = {
  cell: string,
  index: number,
  userSelect: (x: number, y: string, isWinner: boolean) => void,
  disabled: boolean,
  user: string,
  userWinner: boolean
};

const Cell = ({
  cell,
  userSelect,
  index,
  disabled,
  user,
  userWinner
}: Props) => {
  if (disabled) {
    return <div className="disabled cell">{cell}</div>;
  }

  return (
    <div className="cell" onClick={() => userSelect(index, user, userWinner)}>
      {cell}
    </div>
  );
};

export default Cell;
