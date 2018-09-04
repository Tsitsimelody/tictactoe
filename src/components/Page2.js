// @flow
import React from "react";

type Props = {
  beginner: string,
  onChangePage: (x: number, per: string) => void
};

const Page2 = ({ beginner, onChangePage }: Props) => (
  <div>
    <button onClick={() => onChangePage(3, beginner)}> Continue </button>
    <div style={{ fontSize: "22px", color: "cadetblue", paddingTop: "30px" }}>
      {beginner}
    </div>
  </div>
);

export default Page2;
