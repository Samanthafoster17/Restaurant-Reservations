import React from "react";
import { updateResStatus } from "../utils/api";

function ReservationsList({ reservation, loadDashboard }) {
  let reservation_id = reservation.reservation_id;

  async function cancelAlert(e) {
    e.preventDefault();
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      await updateResStatus(reservation_id, { status: "cancelled" });
      await loadDashboard();
    }
  }

  return (
    <tbody>
      <tr key={reservation.reservation_id}>
        <th scope="row">{reservation.reservation_id}</th>
        <td>
          {reservation.last_name}, {reservation.first_name}
        </td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.people}</td>
        <td data-reservation-id-status={`${reservation.reservation_id}`}>
          {reservation.status}
        </td>
        {reservation.status === "booked" ? (
          <td>
            <a href={`/reservations/${reservation.reservation_id}/seat`}>
              <button className="btn btn-secondary">Seat</button>
            </a>
          </td>
        ) : (
          <td></td>
        )}
        <td>
          <a
            className="btn btn-secondary"
            href={`/reservations/${reservation.reservation_id}/edit`}
          >
            Edit
          </a>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-secondary cancel"
            data-reservation-id-cancel={reservation_id}
            onClick={cancelAlert}
          >
            Cancel
          </button>
        </td>
      </tr>
    </tbody>
  );
}

export default ReservationsList;
