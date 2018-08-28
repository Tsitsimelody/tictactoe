// @flow
import React from "react";

type Props = {
  cell: string,
  index: number,
  userSelect: (x: number) => void,
  disabled: boolean
};

const Cell = ({ cell, userSelect, index, disabled }: Props) => {
  if (disabled) {
    return <div className="disabled cell">{cell}</div>;
  }

  return (
    <div className="cell" onClick={() => userSelect(index)}>
      {cell}
    </div>
  );
};

export default Cell;
