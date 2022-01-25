import React from "react";

export default function TablesTable({ tablesList }) {
  return (
    <div id="tables">
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">TABLE NAME</th>
            <th scope="col">CAPACITY</th>
            <th scope="col">FREE?</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{tablesList()}</tbody>
      </table>
    </div>
  );
}
