import React from "react";
import "./ProjectForm.css";
import ErrorAlert from "../layout/ErrorAlert";

function ProjectForm({
  pageTitle,
  handleSubmit,
  formData,
  handleChange,
  handleCancel,
  newProjectError,
}) {
  const availableStatuses = [
    "Discovery",
    "Waiting",
    "In-Progress",
    "Sent",
    "Complete",
    "Archive",
  ];
  const availableColors = [
    "Red",
    "Orange",
    "Yellow",
    "Green",
    "Blue",
    "Indigo",
    "Violet",
  ];

  return (
    <div className="box">
      <div className="header">
        <div className="text">{pageTitle}</div>
        <div className="underline"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-inputs">
          <div className="form-input">
            <div className="input-title">Project Name: </div>
            <label htmlFor="project_name">
              <input
                id="project_name"
                type="text"
                className="input-body"
                name="project_name"
                value={formData.project_name}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="form-input">
            <div className="input-title">Client: </div>
            <label htmlFor="client">
              <input
                id="client"
                type="text"
                name="client"
                className="input-body"
                value={formData.client}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="form-input">
            <div className="input-title">Select Status:</div>
            <label htmlFor="status">
              <select
                id="status"
                name="status"
                className="input-body"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="">Select a Status...</option>
                {availableStatuses.map((status) => (
                  <option value={status}>{status}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-input">
            <div className="input-title">Select Tag:</div>
            <label htmlFor="tag">
              <select
                id="tag"
                name="tag"
                className="input-body"
                value={formData.tag}
                onChange={handleChange}
                required
              >
                <option value="">Select Tag Color...</option>
                {availableColors.map((tag) => (
                  <option value={tag}>{tag}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-input">
            <div className="input-title">Notes: </div>
            <label htmlFor="notes">
              <textarea
                id="notes"
                type="text"
                name="notes"
                className="input-body"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
              />
            </label>
          </div>
          <ErrorAlert error={newProjectError} />
          <div className="submit-container">
            <button type="submit" className="submit">
              Submit
            </button>
            <button
              type="button"
              className="submit gray"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProjectForm;
