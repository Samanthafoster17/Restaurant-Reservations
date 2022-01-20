import React, { useState } from "react";
import { listReservations } from "../utils/api";
import { useHistory } from "react-router";

export default function Search() {
  const history = useHistory();
  const [mobile_number, setMobile_number] = useState("");
  const [reservations, setReservations] = useState([]);

  const searchResults = () => {
    return reservations.map((reservation) => (
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
          <tbody>
            <tr>
              <td>{reservation.reservation_id}</td>
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
            </tr>
          </tbody>
        </table>
      </div>
    ));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    listReservations({ mobile_number }).then(setReservations);
    history.push("/search");
  };

  return (
    <main>
      <h1>Search reservations</h1>
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
      {searchResults()}
    </main>
  );
}
