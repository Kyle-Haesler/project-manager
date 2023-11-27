import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createProject } from "../utils/api";
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
    tag: "red",
  };
  const pageTitle = "New Project";
  const history = useHistory();
  const [formData, setFormData] = useState({ ...initialFormState });
  const [newProjectError, setNewProjectError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }
  function handleCancel() {
    history.push("/");
  }

  async function handleSubmit(event) {
    setNewProjectError("");
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await createProject(formData, abortController.signal);
      history.push("/");
      setFormData({ ...initialFormState });
    } catch (error) {
      setNewProjectError(error);
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
        newProjectError={newProjectError}
      />
    </>
  );
}

export default NewProject;
