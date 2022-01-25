import React from "react";

import { NavLink } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  return (
    <nav className="navbar navbar-dark align-items-start">
      <div className="container-fluid d-flex p-0">
        <NavLink
          exact
          activeClassName="active"
          className="navbar-brand h1 d-flex justify-content-center align-items-center m-0"
          to="/"
        >
          <div className="brand-text mx-3">
            <span>Periodic Tables</span>
          </div>
        </NavLink>
        <ul className="nav nav-pills nav-fill">
          <li className="nav-item">
            <NavLink
              activeClassName="active"
              className="nav-link"
              to="/dashboard"
            >
              <span className="oi oi-dashboard" />
              &nbsp;Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active" className="nav-link" to="/search">
              <span className="oi oi-magnifying-glass" />
              &nbsp;Search
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/reservations/new">
              <span className="oi oi-plus" />
              &nbsp;New Reservation
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/tables/new">
              <span className="oi oi-layers" />
              &nbsp;New Table
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Menu;
