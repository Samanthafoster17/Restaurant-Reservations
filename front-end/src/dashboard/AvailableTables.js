import React, { useState } from "react";
import { seatReservation } from "../utils/api";
import { useParams, useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

export default function AvailableTables({ tables = [], reservation_id }) {



    const history = useHistory();
    const [tableId, setTableId] = useState("")
    const [seatedTables, setSeatedTables] = useState([]);
    const [error, setError] = useState(null);


    function handleSubmit(e) {
        e.preventDefault();
        console.log(tableId)
        seatReservation(tableId, reservation_id)
            .then((response) => {
                const newTables = tables.map((table) => {
                    return table.table_id === response.table_id ? response : table
                })
                console.log(newTables)
                setSeatedTables(newTables)
                history.push('/dashboard')
            })
            .catch(setError)
        return;
    }




    const tablesOptions = () => {
        return tables.map((table) => (

            <option key={table.table_id} value={JSON.stringify(table.table_id)} required={true}>{table.table_name} - {table.capacity}</option>

        ))
    }


    return (
        <>
            <form>
                <fieldset>
                    <div className="row"></div>
                    <div className="form-group col">
                        <label htmlFor="table_id">Seat at:</label>
                        <select id="table_id" name="table_id" className="form-control" onChange={((e) => setTableId(e.target.value))}>
                            <option value="">Select a table</option>
                            {tablesOptions()}
                        </select>
                    </div>
                    <button type="button" className="btn btn-secondary mr-2 cancel"><span className="oi oi-x"></span> Cancel</button>
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary"><span className="oi oi-check"></span> Submit</button>
                </fieldset>
            </form>
            <ErrorAlert error={error} />
        </>
    )
}