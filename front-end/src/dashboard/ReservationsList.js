import React from "react";

function ReservationsList({ reservation }) {
  let reservation_id = reservation.reservation_id;
  return (
    <>
      {reservation.status === "finished" ? <td></td> : (
        <tbody>
          <tr>
            <td>{reservation_id}</td>
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
                href={`/reservations/${reservation_id}/edit`}
              >
                Edit
              </a>
            </td>
            <td>
              <button
                type="button"
                className="btn btn-secondary mr-2 cancel"
                data-reservation-id-cancel={reservation_id}
              >
                Cancel
              </button>
            </td>
          </tr>
        </tbody>
      )}
    </>
  );
}

export default ReservationsList;
