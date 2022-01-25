import React from "react";
import { clearSeat } from "../utils/api";

export default function TablesList({ table, loadDashboard }) {
  async function finishAlert(e) {
    e.preventDefault();
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      await clearSeat(table.table_id);
      await loadDashboard();
    }
  }

  let btn = (
    <button
      type="button"
      onClick={finishAlert}
      className="btn btn-sm btn-secondary"
      data-table-id-finish={`${table.table_id}`}
    >
      Finish
    </button>
  );

  return (
    <tr key={table.table_id}>
      <th scope="row">{table.table_id}</th>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td data-table-id-status={`${table.table_id}`}>
        {table.reservation_id ? "occupied" : "free"}
      </td>
      <td> {table.reservation_id ? btn : null} </td>
    </tr>
  );
}
