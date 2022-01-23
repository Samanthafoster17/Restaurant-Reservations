import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import useQuery from "../utils/useQuery";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import NewTable from "../tables/CreateTables";
import Seat from "../reservations/Seat";
import Search from "../reservations/Search";
import Form from "../reservations/ReservationForm";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const [date, setDate] = useState(today());

  const url = useRouteMatch();
  const query = useQuery();

  function loadDate() {
    const newDate = query.get("date");
    if (newDate) {
      setDate(newDate);
    }
  }

  useEffect(loadDate, [url, query]);

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/tables">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/dashboard">
        <Dashboard date={today()} />
      </Route>
      <Route exact={true} path="/reservations/new">
        <Form />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/seat">
        <Seat />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/edit">
        <Form />
      </Route>
      <Route exact={true} path="/tables/new">
        <NewTable />
      </Route>
      <Route>
        <Search exact={true} path="/search" />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
