import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [projectsError, setProjectsError] = useState(null);
/* NEED TO GET FUNCTIONING
  useEffect(loadDashboard, []);

  function loadDashboard() {
    const abortController = new AbortController();
    setProjectsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }
  */

  return (
    <div>
    <header className="jumbotron jumbotron-fluid bg-primary text-white text-center">
      <h1 className="display-4">Project Manager</h1>
    </header>
    <main>
      <button type="button" className="btn btn-primary">Create Project</button>
        <div className="row justify-content-around">
          <span className="border">
          <div className="col-md-1 mb-4">
            <h2>Discovery</h2>
          </div>
          </span>
          <span className="border">
          <div className="col-md-1 mb-4">
            <h2>Waiting</h2>
          </div>
          </span>
          <span className="border">
          <div className="col-md-1 mb-4">
            <h2>Sent</h2>
          </div>
          </span>
          <span className="border">
          <div className="col-md-1 mb-4">
            <h2>In-Progress</h2>
          </div>
          </span>
          <span className="border">
          <div className="col-md-1 mb-4">
            <h2>Sent</h2>
          </div>
          </span>
          <span className="border">
          <div className="col-md-1 mb-4">
            <h2>Complete</h2>
          </div>
          </span>
          <span className="border">
          <div className="col-md-1 mb-4">
            <h2>Archive</h2>
          </div>
          </span>
      </div>
      <ErrorAlert error={projectsError} />
    </main>
    </div>
  );
}

export default Dashboard;
