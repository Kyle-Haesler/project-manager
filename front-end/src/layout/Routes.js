import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import NewProject from "../newProject/NewProject";
import EditProject from "../editProject/EditProject";
import LoginSignUp from "../LoginSignUp/LoginSignUp.js";
import { useUser } from "../userContext/userContext.js";

function Routes() {
  const { user } = useUser();

  return (
    <Switch>
      <Route exact={true} path="/">
        {user ? <Dashboard /> : <Redirect to="/loginsignup" />}
      </Route>
      <Route path="/loginsignup">
        <LoginSignUp />
      </Route>
      <Route path="/new">
        {user ? <NewProject /> : <Redirect to="/loginsignup" />}
      </Route>
      <Route path="/:project_id">
        {user ? <EditProject /> : <Redirect to="/loginsignup" />}
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
