import React from "react";

export default function ReservationTable({ reservationList, reservations }) {
  return (
    <div className="table-responsive">
      <table className="table no-wrap">
        <thead>
          <tr>
            <th className="border-top-0">#</th>
            <th className="border-top-0">NAME</th>
            <th className="border-top-0">PHONE</th>
            <th className="border-top-0">DATE</th>
            <th className="border-top-0">TIME</th>
            <th className="border-top-0">PEOPLE</th>
            <th className="border-top-0">STATUS</th>
          </tr>
        </thead>

        {reservations.length ? (
          reservationList()
        ) : (
          <> No Reservations for Today</>
        )}
      </table>
    </div>
  );
}
