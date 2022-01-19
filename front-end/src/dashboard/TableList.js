import React from "react";
import { useHistory } from "react-router-dom";
// import FinishBtn from './FinishBtn';
import { clearSeat, listTables } from "../utils/api";

export default function TablesList({ table, loadDashboard }) {
  const history = useHistory();
  let tableId = table.table_id;

  async function finishAlert() {
      console.log("HELLO")
    if (
      window.confirm(
        "Is this table ready to seat new guests?" 
      )
    ) {
        console.log("ABC")
      await clearSeat(table.table_id)
      await loadDashboard()
      console.log("CLICK")
    //   history.push("/");
    }
  }

  let btn = (
    <button
      type="button"
      onClick={finishAlert}
      className="btn btn-sm btn-outline-secondary"
      data-table-id-finish={`${table.table_id}`}
    >
      Finish
    </button>
  );

  return (
    <tbody>
      <tr>
        <td>{table.table_id}</td>
        <td>{table.table_name}</td>
        <td>{table.capacity}</td>
        <td data-table-id-status={`${table.table_id}`}>
          {table.reservation_id ? "occupied" : "free"}
        </td>
        <td> {table.reservation_id ? btn : null} </td>
      </tr>
    </tbody>
  );
}
