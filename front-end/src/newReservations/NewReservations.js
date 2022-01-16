import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createReservation, readReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import formatReservationDate from "../utils/format-reservation-date";
import formatReservationTime from "../utils/format-reservation-time";
import { today } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function NewReservations({ loadDashboard }) {
  const history = useHistory();
  const { reservation_id } = useParams();

  const [error, setError] = useState(null);
  const [reservationsError, setReservationsError] = useState([]);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  })
  useEffect(() => {
    async function loadReservation() {
      if (reservation_id) {
        const abortController = new AbortController();
        setError(null);
        readReservation(reservation_id, abortController.signal)
          .then(formatReservationDate)
          .then(formatReservationTime)
          .then(setFormData)
          .catch(setError);
        return () => abortController.abort();
      }
    }

    loadReservation();
  }, [reservation_id]);

  function handleChange({ target }) {
    setFormData({
      ...formData,
      [target.name]:
      target.name === "people" ? Number(target.value) : target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    const abortController = new AbortController();
    createReservation(formData, abortController.signal)
    .then(() => {
      history.push(`/dashboard?date=${formData.reservation_date}`)
    })
    .catch(setError)
    return () => abortController.abort();
  }



  return (
    <main>
      <h1>Create Reservation</h1>
        <form>
          <fieldset>
            <div className="row">
              <div className="form-group col">
                <label htmlFor="first_name">First Name</label>
                <input type="text" id="first_name" name="first_name" className="form-control" required={true} placeholder="First Name"  onChange={handleChange} value={formData.first_name} />
              </div>
              <div className="form-group col">
                <label htmlFor="last_name">Last Name</label>
                <input type="text" id="last_name" name="last_name" className="form-control" required={true} placeholder="Last Name"  onChange={handleChange} value={formData.last_name} />
              </div>
              <div className="form-group col">
                <label htmlFor="mobile_number">Mobile Number</label>
                <input type="text" id="mobile_number" name="mobile_number" className="form-control" required={true} placeholder="Mobile Number"  onChange={handleChange} value={formData.mobile_number} />
              </div>
            </div>
            <div className="row">
              <div className="form-group col"><label htmlFor="reservation_date">Date</label>
                <input type="date" id="reservation_date" name="reservation_date" className="form-control" required={true} placeholder="yyyy-mm-dd" pattern="\d{4}-\d{2}-\d{2}"  onChange={handleChange} value={formData.reservation_date} />
              </div>
              <div className="form-group col"><label htmlFor="date">Time</label>
                <input type="time" id="reservation_time" name="reservation_time" className="form-control" required={true} placeholder="09:20" pattern="[0-9]{2}:[0-9]{2}"  onChange={handleChange} value={formData.reservation_time} />
              </div>
              <div className="form-group col"><label htmlFor="people">People</label>
                <input type="number" id="people" name="people" className="form-control" aria-label="Number of people" required={true} min="1"  onChange={handleChange} value={formData.people} />
              </div>
            </div>
            <button type="button" onClick={history.goBack} className="btn btn-secondary mr-2 cancel"><span className="oi oi-x"></span> Cancel</button>
            <button type="submit" onClick={handleSubmit} className="btn btn-primary"><span className="oi oi-check"></span> Submit</button>
          </fieldset>
        </form>
    </main>
  );
}

export default NewReservations;
