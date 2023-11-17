import React, { useEffect, useState } from "react";
import { listProjects } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";
import ProjectCard from "../projectsCard/ProjectCard";
import { useUser } from "../userContext/userContext";
import "./Dashboard.css";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [projectsError, setProjectsError] = useState(null);
  const { user, logout } = useUser();
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
      <div className="loginBox">
        <div className="login">
          <div className="loginText">Logged in as: {user}</div>
          <button type="button" onClick={() => logout()}>
            Logout
          </button>
        </div>
      </div>
      <div className="headerbox">
        <div className="header">
          <div className="headerText">Project Manager</div>
          <div className="headerUnderline"></div>
        </div>
      </div>
      <main>
        <button
          type="button"
          className="createButton"
          onClick={createProject}
          style={{ marginBottom: "20px" }}
        >
          + Create Project
        </button>
        <div className="mainContent">
          <div className="column">
            <h2 className="column-title">Discovery</h2>
            <div className="column-title-underline"></div>
            {projects.map((project) => {
              if (
                project.status === "Discovery" &&
                project.user_name === user
              ) {
                return <ProjectCard project={project} />;
              }
            })}
          </div>
          <div className="column">
            <h2 className="column-title">Waiting</h2>
            <div className="column-title-underline"></div>
            {projects.map((project) => {
              if (project.status === "Waiting" && project.user_name === user) {
                return <ProjectCard project={project} />;
              }
            })}
          </div>
          <div className="column">
            <h2 className="column-title">In-Progress</h2>
            <div className="column-title-underline"></div>
            {projects.map((project) => {
              if (
                project.status === "In-Progress" &&
                project.user_name === user
              ) {
                return <ProjectCard project={project} />;
              }
            })}
          </div>
          <div className="column">
            <h2 className="column-title">Sent</h2>
            <div className="column-title-underline"></div>
            {projects.map((project) => {
              if (project.status === "Sent" && project.user_name === user) {
                return <ProjectCard project={project} />;
              }
            })}
          </div>
          <div className="column">
            <h2 className="column-title">Complete</h2>
            <div className="column-title-underline"></div>
            {projects.map((project) => {
              if (project.status === "Complete" && project.user_name === user) {
                return <ProjectCard project={project} />;
              }
            })}
          </div>
          <div className="column">
            <h2 className="column-title">Archive</h2>
            <div className="column-title-underline"></div>
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
