import React from "react";


function ReservationsList({ reservation }) {
    let reservation_id = reservation.reservation_id;
    return (
        <tbody>
            <tr>
                <td>{reservation_id}</td>
                <td>{reservation.first_name}</td>
                <td>{reservation.last_name}</td>
                <td>{reservation.reservation_date}</td>
                <td>{reservation.reservation_date}</td>
                <td>{reservation.people}</td>
                <td data-reservation-id-status="9">{reservation.status}</td>
                <td><a className="btn btn-secondary" href={`/reservations/${reservation_id}/seat`}>Seat</a></td>
                <td><a className="btn btn-secondary" href={`/reservations/${reservation_id}/edit`}>Edit</a></td><td>
                    <button type="button" className="btn btn-secondary mr-2 cancel" data-reservation-id-cancel={reservation_id}>Cancel</button>
                </td>
            </tr>
        </tbody>

    )
}




export default ReservationsList;