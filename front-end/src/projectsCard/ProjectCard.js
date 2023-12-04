import { useHistory } from "react-router-dom";
import { updateProjectStatus } from "../utils/api";
import { deleteProject } from "../utils/api";
// todo: add errorhandler here

function ProjectCard({ project }) {
  const availableStatuses = [
    "Discovery",
    "Waiting",
    "In-Progress",
    "Sent",
    "Complete",
    "Archive",
  ];
  const history = useHistory();
  const currentStatusIndex = availableStatuses.indexOf(project.status);

  async function handleMoveBack() {
    const abortController = new AbortController();
    let newIndex;
    if (currentStatusIndex === 0) {
      newIndex = availableStatuses.length - 1;
    } else {
      newIndex = currentStatusIndex - 1;
    }
    await updateProjectStatus(
      availableStatuses[newIndex],
      Number(project.project_id),
      abortController.signal
    );
    window.location.reload();
    return () => abortController.abort();
  }
  async function handleMoveForward() {
    const abortController = new AbortController();
    let newIndex;
    if (currentStatusIndex === availableStatuses.length - 1) {
      newIndex = 0;
    } else {
      newIndex = currentStatusIndex + 1;
    }
    await updateProjectStatus(
      availableStatuses[newIndex],
      Number(project.project_id),
      abortController.signal
    );
    window.location.reload();
    return () => abortController.abort();
  }

  function handleEdit() {
    history.push(`/${project.project_id}`);
  }
  async function handleDelete() {
    const abortController = new AbortController();
    try {
      const confirmMessage =
        "Are you sure you want to delete this project? This cannot be undone :/.";
      const confirmed = window.confirm(confirmMessage);
      if (confirmed) {
        await deleteProject(project.project_id, abortController.signal);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
    return () => abortController.abort();
  }

  return (
    <div className="card" style={{ marginBottom: "20px" }}>
      <h5
        className="card-header"
        style={{ background: "black", color: "white" }}
      >
        {project.project_name}
      </h5>
      <div className="card-body">
        <p className="card-text">
          <b>Client: </b>
          {project.client}
        </p>
        <p className="card-text">
          <b>Status: </b>
          {project.status}
        </p>
        <div
          className="card-text"
          style={{
            background: project.tag,
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            margin: "10px 0",
          }}
        ></div>
        <p className="card-text">
          <b>Notes: </b>
          {project.notes}
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleMoveBack}
            style={{ marginRight: "10px" }}
          >
            &larr;
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleMoveForward}
            style={{ marginRight: "10px" }}
          >
            &rarr;
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={handleEdit}
            style={{ marginRight: "10px" }}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
