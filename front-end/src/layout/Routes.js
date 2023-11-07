import React from "react";

import { Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import NewProject from "../newProject/NewProject";
import EditProject from "../editProject/EditProject";


function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Dashboard />
      </Route>
      <Route path="/new">
        <NewProject />
      </Route>
      <Route path="/:project_id">
        <EditProject />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
