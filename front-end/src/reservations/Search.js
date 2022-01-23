import React, { useState } from "react";
import { listReservations } from "../utils/api";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "./ReservationsList";
import ReservationTable from "./ReservationTable";

export default function Search() {
  const history = useHistory();
  const [mobile_number, setMobile_number] = useState("");
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);

  const submitHandler = (e) => {
    const abortController = new AbortController();
    setError(null);
    e.preventDefault();
    listReservations({ mobile_number }, abortController.signal)
      .then(setReservations)
      .catch(setError);
    history.push("/search");
    return () => abortController.abort();
  };

  const searchResults = () => {
    return reservations.map((reservation) => (
      <ReservationsList reservation={reservation} />
    ));
  };

  return (
    <main>
      <h1>Search reservations</h1>
      <ErrorAlert error={error} />
      <form onSubmit={submitHandler}>
        <fieldset>
          <div className="row">
            <div className="form-group col-md-4 col-sm-12">
              <label htmlFor="mobile_number">Mobile Number:</label>
              <div className="input-group">
                <input
                  type="search"
                  id="mobile_number"
                  name="mobile_number"
                  className="form-control"
                  placeholder="Enter the customer's mobile number"
                  onChange={(e) => {
                    setMobile_number(e.target.value);
                  }}
                  value={mobile_number}
                  required={true}
                />
                <div className="input-group-append">
                  <button type="submit" className="btn btn-primary">
                    <span className="oi oi-magnifying-glass"></span>
                    Find
                  </button>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
      {reservations.length ? (
        <ReservationTable
          reservationList={searchResults}
          reservations={reservations}
        />
      ) : (
        "No reservations found"
      )}
    </main>
  );
}
