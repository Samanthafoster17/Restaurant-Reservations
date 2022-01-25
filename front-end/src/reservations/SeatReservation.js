import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import SeatTable from "../tables/SeatTable";
import { listTables, readReservation } from "../utils/api";

export default function SeatReservation() {
  const { reservation_id } = useParams();
  const [reservation, setReservation] = useState({});
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function seatTables() {
      const abortController = new AbortController();
      setError(null);
      readReservation(reservation_id, abortController.signal)
        .then(setReservation)
        .catch(setError);
      listTables(abortController.signal).then(setTables).catch(setError);
      return () => abortController.abort();
    }
    seatTables();
  }, [reservation_id]);

  return (
    <div className="col">
      <main>
        <h1>{reservation.reservation_id}</h1>
        <h3>
          # {reservation.reservation_id} - {reservation.first_name}{" "}
          {reservation.last_name} on {reservation.reservation_date} at{" "}
          {reservation.reservation_time} for {reservation.people}{" "}
        </h3>

        <SeatTable tables={tables} reservation_id={reservation_id} />
      </main>
      <ErrorAlert error={error} />
    </div>
  );
}
