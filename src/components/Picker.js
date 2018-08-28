// @flow
import React from "react";

type Props = {
  users: Array<string>,
  pickUser: (x: string) => void
};

const Picker = ({ users, pickUser }: Props) => (
  <div>
    <h4> Pick a selector </h4>
    <div className="picks">
      {users.map((usr, i) => (
        <div key={i} className="pick" onClick={() => pickUser(usr)}>
          {usr}
        </div>
      ))}
    </div>
  </div>
);

export default Picker;
