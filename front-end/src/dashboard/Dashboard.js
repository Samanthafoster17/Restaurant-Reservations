import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import { today, previous, next } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationTable from "../layout/ReservationTable";
import TablesTable from "../layout/TablesTable";
import ReservationsList from "../dashboard/ReservationsList";
import TablesList from "../dashboard/TableList";



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


  const reservationList = () => {
    return reservations.map((reservation) => (
      <ReservationsList
        reservation={reservation} />
    ))
  }


  const tablesList = () => {
    return tables.map((table) => (
      <TablesList
        table={table} />
    ))
  }

   let day = today(date);
   let nextDay = next(date);
   let prevDay = previous(date);
  

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="row">
        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="d-md-flex mb-3">
            <h4 className="mb-0">Reservations for {date}</h4>
          </div>
          <div className="btn-group" role="group" aria-label="navigation buttons">
            <a className="btn btn-secondary" href={`/dashboard?date=${prevDay}`}>
              <span className="oi oi-chevron-left"></span>&nbsp;Previous</a>
            <a className="btn btn-secondary" href={`/dashboard?date=${day}`}>Today</a>
            <a className="btn btn-secondary" href={`/dashboard?date=${nextDay}`}>Next&nbsp;
              <span className="oi oi-chevron-right"></span></a>
          </div>
          <ReservationTable
            reservationList={reservationList}
            reservations={reservations}
          />
        </div>
        <div className="col-md-6 col-lg-6 col-sm-12">
        <TablesTable
            tablesList={tablesList}
            tables={tables}
          />
        </div>
        <ErrorAlert error={reservationsError} />
      </div>
    </main>
  );
}

export default Dashboard;
