import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Form from "../layout/ReservationForm";


/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function NewReservations() {
  const history = useHistory();
  const [error, setError] = useState(null);


  function handleSubmit(formData) {
    createReservation(formData)
      .then(() => {
        history.push(`/dashboard?date=${formData.reservation_date}`)
      })
      .catch(setError)
    return;
  }



  return (
    <main>
      <h1>Create Reservation</h1>
      <Form
        handleSubmit={handleSubmit}
      />
      <ErrorAlert error={error} />
    </main>
  );
}

export default NewReservations;
