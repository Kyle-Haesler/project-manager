import React, { useEffect, useState } from "react";
import { listProjects, searchProjects } from "../utils/api";
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
  const initialCategoryView = {
    discovery: "view",
    waiting: "view",
    inProgress: "view",
    sent: "view",
    complete: "view",
    archive: "view",
  };

  const [categoryView, setCategoryView] = useState({ ...initialCategoryView });
  // Search Form
  const [searchForm, setSearchForm] = useState("");
  function handleSearchChange({ target }) {
    setSearchForm(target.value);
  }
  async function handleSearchSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      const data = await searchProjects(searchForm, abortController.signal);
      setProjects(data);
      setSearchForm("");
    } catch (error) {
      console.error(error);
    }
    return () => abortController.abort();
  }
  // Initial page load
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
  function toggleChangeCategoryView(category) {
    if (categoryView[category] === "view") {
      setCategoryView({ ...categoryView, [category]: "hide" });
    } else {
      setCategoryView({ ...categoryView, [category]: "view" });
    }
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
        <div className="button-container">
          <button
            type="button"
            className="createButton"
            onClick={createProject}
            style={{ marginBottom: "20px" }}
          >
            + Create Project
          </button>
          <button
            type="button"
            className={
              categoryView.discovery === "view"
                ? "toggle-button toggled"
                : "toggle-button"
            }
            onClick={() => toggleChangeCategoryView("discovery")}
          >
            {categoryView.discovery === "view" ? "- Discovery" : "+ Discovery"}
          </button>
          <button
            type="button"
            className={
              categoryView.waiting === "view"
                ? "toggle-button toggled"
                : "toggle-button"
            }
            onClick={() => toggleChangeCategoryView("waiting")}
          >
            {categoryView.waiting === "view" ? "- Waiting" : "+ Waiting"}
          </button>
          <button
            type="button"
            className={
              categoryView.inProgress === "view"
                ? "toggle-button toggled"
                : "toggle-button"
            }
            onClick={() => toggleChangeCategoryView("inProgress")}
          >
            {categoryView.inProgress === "view"
              ? "- In-Progress"
              : "+ In-Progress"}
          </button>
          <button
            type="button"
            className={
              categoryView.sent === "view"
                ? "toggle-button toggled"
                : "toggle-button"
            }
            onClick={() => toggleChangeCategoryView("sent")}
          >
            {categoryView.sent === "view" ? "- Sent" : "+ Sent"}
          </button>
          <button
            type="button"
            className={
              categoryView.complete === "view"
                ? "toggle-button toggled"
                : "toggle-button"
            }
            onClick={() => toggleChangeCategoryView("complete")}
          >
            {categoryView.complete === "view" ? "- Complete" : "+ Complete"}
          </button>
          <button
            type="button"
            className={
              categoryView.archive === "view"
                ? "toggle-button toggled"
                : "toggle-button"
            }
            onClick={() => toggleChangeCategoryView("archive")}
          >
            {categoryView.archive === "view" ? "- Archive" : "+ Archive"}
          </button>
          <button
            type="button"
            className="toggle-button reset"
            onClick={() => setCategoryView({ ...initialCategoryView })}
          >
            Reset Filters
          </button>
          <form onSubmit={handleSearchSubmit}>
            <input
              name="search"
              id="search"
              type="text"
              value={searchForm}
              onChange={handleSearchChange}
              required
            ></input>
            <button type="submit" className="search-button">
              Search
            </button>
            <button
              type="button"
              className="search-button clear"
              onClick={() => window.location.reload()}
            >
              Clear
            </button>
          </form>
        </div>
        <div className="mainContent">
          {categoryView.discovery === "view" ? (
            <div className="column">
              <h2 className="column-title">Discovery</h2>
              <div className="column-title-underline"></div>
              {projects
                .filter(
                  (project) =>
                    project.status === "Discovery" && project.user_name === user
                )
                .map((project) => (
                  <ProjectCard key={project.project_id} project={project} />
                ))}
            </div>
          ) : (
            <div></div>
          )}
          {categoryView.waiting === "view" ? (
            <div className="column">
              <h2 className="column-title">Waiting</h2>
              <div className="column-title-underline"></div>
              {projects
                .filter(
                  (project) =>
                    project.status === "Waiting" && project.user_name === user
                )
                .map((project) => (
                  <ProjectCard key={project.project_id} project={project} />
                ))}
            </div>
          ) : (
            <div></div>
          )}
          {categoryView.inProgress === "view" ? (
            <div className="column">
              <h2 className="column-title">In-Progress</h2>
              <div className="column-title-underline"></div>
              {projects
                .filter(
                  (project) =>
                    project.status === "In-Progress" &&
                    project.user_name === user
                )
                .map((project) => (
                  <ProjectCard key={project.project_id} project={project} />
                ))}
            </div>
          ) : (
            <div></div>
          )}
          {categoryView.sent === "view" ? (
            <div className="column">
              <h2 className="column-title">Sent</h2>
              <div className="column-title-underline"></div>
              {projects
                .filter(
                  (project) =>
                    project.status === "Sent" && project.user_name === user
                )
                .map((project) => (
                  <ProjectCard key={project.project_id} project={project} />
                ))}
            </div>
          ) : (
            <div></div>
          )}
          {categoryView.complete === "view" ? (
            <div className="column">
              <h2 className="column-title">Complete</h2>
              <div className="column-title-underline"></div>
              {projects
                .filter(
                  (project) =>
                    project.status === "Complete" && project.user_name === user
                )
                .map((project) => (
                  <ProjectCard key={project.project_id} project={project} />
                ))}
            </div>
          ) : (
            <div></div>
          )}
          {categoryView.archive === "view" ? (
            <div className="column">
              <h2 className="column-title">Archive</h2>
              <div className="column-title-underline"></div>
              {projects
                .filter(
                  (project) =>
                    project.status === "Archive" && project.user_name === user
                )
                .map((project) => (
                  <ProjectCard key={project.project_id} project={project} />
                ))}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <ErrorAlert error={projectsError} />
      </main>
    </div>
  );
}

export default Dashboard;
