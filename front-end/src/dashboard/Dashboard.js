import React, { useEffect, useState } from "react";
import { listProjects } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";
import ProjectCard from "../projectsCard/ProjectCard";
import { useUser } from "../userContext/userContext";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [projectsError, setProjectsError] = useState(null);
  const { user } = useUser();
  const history = useHistory();

  useEffect(loadDashboard, []);

  function loadDashboard() {
    const abortController = new AbortController();
    setProjectsError(null);
    listProjects(abortController.signal)
      .then(setProjects)
      .catch(setProjectsError);
    return () => abortController.abort();
  }

  function createProject() {
    history.push("/new");
  }

  return (
    <div>
      <header
        className="jumbotron jumbotron-fluid"
        style={{ background: "black", color: "white", textAlign: "center" }}
      >
        <h1 className="display-4">Project Manager</h1>
      </header>
      <main>
        <button
          type="button"
          className="btn btn-primary"
          onClick={createProject}
          style={{ marginBottom: "20px" }}
        >
          Create Project
        </button>
        <div className="row">
          <div className="col-md-2 mb-4" style={{ background: "#fe4365" }}>
            <h2
              style={{
                color: "#fe4365",
                border: "4px solid black",
                background: "white",
                textAlign: "center",
              }}
            >
              Discovery
            </h2>
            {projects.map((project) => {
              if (
                project.status === "Discovery" &&
                project.user_name === user
              ) {
                return <ProjectCard project={project} />;
              }
            })}
          </div>
          <div className="col-md-2 mb-4" style={{ background: "#fc9d9a" }}>
            <h2
              style={{
                color: "#fc9d9a",
                border: "4px solid black",
                background: "white",
                textAlign: "center",
              }}
            >
              Waiting
            </h2>
            {projects.map((project) => {
              if (project.status === "Waiting" && project.user_name === user) {
                return <ProjectCard project={project} />;
              }
            })}
          </div>
          <div className="col-md-2 mb-4" style={{ background: "#f9cdad" }}>
            <h2
              style={{
                color: "#f9cdad",
                border: "4px solid black",
                background: "white",
                textAlign: "center",
              }}
            >
              In-Progress
            </h2>
            {projects.map((project) => {
              if (
                project.status === "In-Progress" &&
                project.user_name === user
              ) {
                return <ProjectCard project={project} />;
              }
            })}
          </div>
          <div className="col-md-2 mb-4" style={{ background: "#c8c8a9" }}>
            <h2
              style={{
                color: "#c8c8a9",
                border: "4px solid black",
                background: "white",
                textAlign: "center",
              }}
            >
              Sent
            </h2>
            {projects.map((project) => {
              if (project.status === "Sent" && project.user_name === user) {
                return <ProjectCard project={project} />;
              }
            })}
          </div>
          <div className="col-md-2 mb-4" style={{ background: "#83af9b" }}>
            <h2
              style={{
                color: "#83af9b",
                border: "4px solid black",
                background: "white",
                textAlign: "center",
              }}
            >
              Complete
            </h2>
            {projects.map((project) => {
              if (project.status === "Complete" && project.user_name === user) {
                return <ProjectCard project={project} />;
              }
            })}
          </div>
          <div className="col-md-2 mb-4" style={{ background: "#ff0151" }}>
            <h2
              style={{
                color: "#ff0151",
                border: "4px solid black",
                background: "white",
                textAlign: "center",
              }}
            >
              Archive
            </h2>
            {projects.map((project) => {
              if (project.status === "Archive" && project.user_name === user) {
                return <ProjectCard project={project} />;
              }
            })}
          </div>
        </div>

        <ErrorAlert error={projectsError} />
      </main>
    </div>
  );
}

export default Dashboard;
