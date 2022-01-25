import React from "react";

export default function ReservationTable({ reservationList, reservations }) {
  return (
    <div id="reservation" className="table">
      {reservations.length ? (
        <table className="table-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">NAME</th>
              <th scope="col">PHONE</th>
              <th scope="col">DATE</th>
              <th scope="col">TIME</th>
              <th scope="col">PEOPLE</th>
              <th scope="col">STATUS</th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>

          {reservationList()}
        </table>
      ) : (
        <div>{"No reservations for today"}</div>
      )}
    </div>
  );
}
