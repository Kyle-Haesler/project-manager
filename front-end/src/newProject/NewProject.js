import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createProject } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ProjectForm from "../helper components/ProjectForm";
import { useUser } from "../userContext/userContext";

function NewProject() {
  const { user } = useUser();
  const initialFormState = {
    project_name: "",
    client: "",
    status: "",
    notes: "",
    user_name: user,
  };
  const pageTitle = "Create New Project";
  const history = useHistory();
  const [formData, setFormData] = useState({ ...initialFormState });
  const [projectsError, setProjectsError] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }
  function handleCancel() {
    history.push("/");
  }

  async function handleSubmit(event) {
    setProjectsError(null);
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await createProject(formData, abortController.signal);
      history.push("/");
      setFormData({ ...initialFormState });
    } catch (error) {
      setProjectsError(error);
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
      />
    </>
  );
}

export default NewProject;
