// @flow
import React from "react";

type Props = {
  cell: string,
  index: number,
  userSelect: (x: number, y: string) => void,
  disabled: boolean,
  user: string
};

const Cell = ({ cell, userSelect, index, disabled, user }: Props) => {
  if (disabled) {
    return <div className="disabled cell">{cell}</div>;
  }

  return (
    <div className="cell" onClick={() => userSelect(index, user)}>
      {cell}
    </div>
  );
};

export default Cell;
