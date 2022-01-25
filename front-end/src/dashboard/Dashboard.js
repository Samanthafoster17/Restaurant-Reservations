import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import { today, previous, next } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationTable from "../reservations/ReservationTable";
import TablesTable from "../tables/TablesTable";
import ReservationsList from "../reservations/ReservationsList";
import TablesList from "../tables/TableList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);

  const query = useQuery().get("date");
  if (query) date = query;

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  // filtering reservations to only display not finished,
  // then map through reservations to access each reservation data
  const reservationList = () => {
    const filteredRes = reservations.filter(
      (reservation) => reservation.status !== "finished"
    );
    return filteredRes.map((reservation) => (
      <ReservationsList
        loadDashboard={loadDashboard}
        reservation={reservation}
        key={reservation.reservation_id}
      />
    ));
  };

  // map through tables to access each table data
  const tablesList = () => {
    return tables.map((table) => (
      <TablesList
        table={table}
        loadDashboard={loadDashboard}
        key={table.table_id}
      />
    ));
  };

  let day = today(date);
  let nextDay = next(date);
  let prevDay = previous(date);

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="row">
        <div className="col">
          <div className="d-md-flex mb-3">
            <h4 className="mb-0">Reservations for {date}</h4>
          </div>
          <div
            className="btn-group"
            role="group"
            aria-label="navigation buttons"
          >
            <a
              className="btn btn-secondary mb-2 mr-2"
              href={`/dashboard?date=${prevDay}`}
            >
              <span className="oi oi-chevron-left"></span>&nbsp;Previous
            </a>
            <a
              className="btn btn-secondary mb-2 mr-2"
              href={`/dashboard?date=${day}`}
            >
              Today
            </a>
            <a
              className="btn btn-secondary mb-2"
              href={`/dashboard?date=${nextDay}`}
            >
              Next&nbsp;
              <span className="oi oi-chevron-right"></span>
            </a>
          </div>
          <div className="">
            <ReservationTable
              reservationList={reservationList}
              reservations={reservations}
            />
          </div>
        </div>
        <div className="col">
          <TablesTable tablesList={tablesList} tables={tables} />
        </div>
        <ErrorAlert error={reservationsError} />
      </div>
    </main>
  );
}

export default Dashboard;
