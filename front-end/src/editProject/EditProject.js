import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getProject, updateProject } from "../utils/api";
import ProjectForm from "../helper components/ProjectForm";

function EditProject() {
  const [formData, setFormData] = useState({});
  const [editProjectError, setEditProjectError] = useState("");
  const { project_id } = useParams();
  const history = useHistory();

  const pageTitle = "Edit Project";
  useEffect(() => {
    async function loadProject() {
      const abortController = new AbortController();
      try {
        const data = await getProject(project_id, abortController.signal);
        setFormData(data);
      } catch (error) {
        console.error(error);
      }
      return () => abortController.abort();
    }
    loadProject();
  }, [project_id]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }
  function handleCancel() {
    history.push("/");
  }
  async function handleSubmit(event) {
    event.preventDefault();
    setEditProjectError("");
    const abortController = new AbortController();
    try {
      await updateProject(formData, project_id, abortController.signal);
      history.push("/");
      setFormData({});
    } catch (error) {
      setEditProjectError(error);
    }
    return () => abortController.abort();
  }
  return (
    <>
      <ProjectForm
        pageTitle={pageTitle}
        handleCancel={handleCancel}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        newProjectError={editProjectError}
      />
    </>
  );
}

export default EditProject;
