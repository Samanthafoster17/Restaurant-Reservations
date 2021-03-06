import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Form({
  initialState = {
    table_name: "",
    capacity: "",
  },
  handleSubmit,
}) {
  function createTable(e) {
    e.preventDefault();
    e.stopPropagation();
    handleSubmit(formData);
  }

  const history = useHistory();
  const [formData, setFormData] = useState(initialState);

  function handleChange({ target }) {
    setFormData({
      ...formData,
      [target.name]:
        target.name === "capacity" ? Number(target.value) : target.value,
    });
  }

  return (
    <form>
      <fieldset>
        <div className="row">
          <div className="form-group col">
            <label htmlFor="table_name">Table Name</label>
            <input
              type="text"
              id="table_name"
              name="table_name"
              className="form-control"
              required={true}
              placeholder=""
              onChange={handleChange}
              value={formData.table_name}
            />
            <small className="form-text text-muted">Table name required.</small>
          </div>
          <div className="form-group col">
            <label htmlFor="capacity">Capacity</label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              className="form-control"
              required={true}
              min="1"
              placeholder="1"
              onChange={handleChange}
              value={formData.capacity}
            />
            <small className="form-text text-muted">Capacity required.</small>
          </div>
        </div>
        <button
          type="button"
          onClick={history.goBack}
          className="btn btn-secondary mr-2 cancel"
        >
          <span className="oi oi-x"></span> Cancel
        </button>
        <button type="submit" onClick={createTable} className="btn btn-primary">
          <span className="oi oi-check"></span> Submit
        </button>
      </fieldset>
    </form>
  );
}
