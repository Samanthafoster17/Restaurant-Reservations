import React from "react";


function TodaysReservations({ reservation }) {

    return (
          <tbody>
        <tr>
            <td>{reservation.reservation_id}</td>
            <td>{reservation.first_name}</td>
            <td>{reservation.last_name}</td>
            <td>{reservation.reservation_date}</td>
            <td>{reservation.reservation_date}</td>
            <td>{reservation.people}</td>
            <td data-reservation-id-status="9">{reservation.status}</td>
            {/* <td><a class="btn btn-secondary" href="/reservations/9/seat">Seat</a></td>
        <td><a class="btn btn-secondary" href="/reservations/9/edit">Edit</a></td><td>
            <button type="button" class="btn btn-secondary mr-2 cancel" data-reservation-id-cancel="9">Cancel</button> */}
            {/* </td> */}
            </tr>
            </tbody>
      
      
    )
}




export default TodaysReservations;