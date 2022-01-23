import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable  } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Form from "./TableForm";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function NewTable() {
  const history = useHistory();
  const [error, setError] = useState(null);


  function handleSubmit(formData) {
    const abortController = new AbortController();
    setError(null);
    createTable(formData, abortController.signal)
      .then(() => {
        history.push(`/dashboard`)
      })
      .catch(setError)
      return () => abortController.abort();
  }




  return (
    <main>
      <h1>Create Table</h1>
      <Form
        handleSubmit={handleSubmit}
      />
        <ErrorAlert error={error} />
    </main>
  );
}

export default NewTable;
