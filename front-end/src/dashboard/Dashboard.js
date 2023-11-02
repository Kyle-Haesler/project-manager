import React, { useEffect, useState } from "react";
import { listProjects } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";
import ProjectCard from "../projectsCard/ProjectCard";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [projectsError, setProjectsError] = useState(null);
  const history = useHistory()


  useEffect(loadDashboard, []);

  function loadDashboard() {
    const abortController = new AbortController();
    setProjectsError(null);
    listProjects(abortController.signal)
      .then(setProjects)
      .catch(setProjectsError);
    return () => abortController.abort();
  }

 function createProject(){
  history.push("/new")
 }
 

  return (
    <div>
    <header className="jumbotron jumbotron-fluid bg-primary text-white text-center">
      <h1 className="display-4">Project Manager</h1>
    </header>
    <main>
      <button type="button" className="btn btn-primary" onClick={createProject}>Create Project</button>
        <div className="row">
          <span className="border">
          <div className="col">
            <h2>Discovery</h2>
            {projects.map((project) => {
              if(project.status === "Discovery"){
               return <ProjectCard project={project} />
              }
            })}
          </div>
          </span>
          <span className="border">
          <div className="col">
            <h2>Waiting</h2>
            {projects.map((project) => {
              if(project.status === "Waiting"){
               return <ProjectCard project={project} />
              }
            })}
          </div>
          </span>
          <span className="border">
          <div className="col">
            <h2>In-Progress</h2>
            {projects.map((project) => {
              if(project.status === "In-Progress"){
               return <ProjectCard project={project} />
              }
            })}
          </div>
          </span>
          <span className="border">
          <div className="col">
            <h2>Sent</h2>
            {projects.map((project) => {
              if(project.status === "Sent"){
               return <ProjectCard project={project} />
              }
            })}
          </div>
          </span>
          <span className="border">
          <div className="col">
            <h2>Complete</h2>
            {projects.map((project) => {
              if(project.status === "Complete"){
               return <ProjectCard project={project} />
              }
            })}
          </div>
          </span>
          <span className="border">
          <div className="col">
            <h2>Archive</h2>
            {projects.map((project) => {
              if(project.status === "Archive"){
               return <ProjectCard project={project} />
              }
            })}
          </div>
          </span>
      </div>
      
      <ErrorAlert error={projectsError} />
    </main>
    </div>
  );
}

export default Dashboard;
