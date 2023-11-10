import React from "react"


function ProjectForm({pageTitle, handleSubmit, formData, handleChange, handleCancel}){

    const availableStatuses = [
        "Discovery",
        "Waiting",
        "In-Progress",
        "Sent",
        "Complete",
        "Archive"
      ]

    return (
        <div>
<header className="jumbotron jumbotron-fluid" style={{background: "black", color: "white", textAlign: "center"}}>
<h1 className="display-4">{pageTitle}</h1>
</header>
<div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
<form onSubmit={handleSubmit} style={{width: "600px"}}>
    <label htmlFor="project_name" style={{width: "100%"}}>
        <b>Project Name:</b>
        <br />
    <input
    id="project_name"
    type="text"
    name="project_name"
    value={formData.project_name}
    onChange={handleChange}
    style={{width: "100%", borderColor: "#007BFF", marginBottom: "10px"}}
    required
    />
    </label>
    <br />
    <label htmlFor="client" style={{width: "100%"}}>
        <b>Client:</b>
        <br /> 
    <input
    id="client"
    type="text"
    name="client"
    value={formData.client}
    onChange={handleChange}
    style={{width: "100%", borderColor: "#007BFF", marginBottom: "10px"}}
    required
    />
    </label>
    <br />
    <label htmlFor="status" style={{width: "100%"}}><b>Select a Status:</b></label>
    <br />
    <select
    id="status"
    name="status"
    value={formData.status}
    onChange={handleChange}
    style={{width: "100%", borderColor: "#007BFF", marginBottom: "10px"}}
    required
    >
        <option value="">Select a Status...</option>
        {availableStatuses.map((status) => (
            <option value={status}>{status}</option>
        ))}
    </select>
    <br />
    <label htmlFor="notes" style={{width: "100%"}}>
        <b>Notes:</b>
        <br />
    <textarea
    id="notes"
    type="text"
    name="notes"
    value={formData.notes}
    onChange={handleChange}
    style={{width: "100%", height: "100px", borderColor: "#007BFF", marginBottom: "10px"}}
    rows="4"
    />
    </label>
    <br />
    <button type="submit" className="btn btn-primary mr-2">Submit</button>
    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
</form>
</div>
</div>

)

}


export default ProjectForm