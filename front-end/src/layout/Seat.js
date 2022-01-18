import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import AvailableTables from "../dashboard/AvailableTables";
import { listTables, readReservation, seatReservation } from "../utils/api";



export default function Seat() {

    const { reservation_id } = useParams();
    const [reservation, setReservation] = useState({});
    const [tables, setTables] = useState();

    useEffect(() => {
        async function seatTables() {
            readReservation(reservation_id)
                .then(setReservation);
            listTables("")
                .then(setTables);
        }
        seatTables()
    }, [reservation_id])
    
  


    return (
        <div className="col">
            <main>
                <h1>{reservation.reservation_id}</h1>
                <h3># {reservation.reservation_id} - {reservation.first_name} {reservation.last_name} on {reservation.reservation_date} at {reservation.reservation_time} for {reservation.people} </h3>
                
                            <AvailableTables
                                tables={tables}
                                reservation_id={reservation_id}
                            />
                      
            </main>
        </div>
    )
}