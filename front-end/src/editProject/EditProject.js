import React, {useState, useEffect} from "react"
import { useHistory, useParams } from "react-router-dom"
import { getProject, updateProject } from "../utils/api"


function EditProject(){
const [project, setProject] = useState({})
const {project_id} = useParams()
const history = useHistory()

async function loadProject(){
    const abortController = new AbortController()
    try{
        const data = await getProject(project_id, abortController.signal)
        setProject(data)
    } catch (error){
        console.error(error)
    }
    return () => abortController.abort()
}
useEffect(loadProject, [project_id])

const availableStatuses = [
    "Discovery",
    "Waiting",
    "In-Progress",
    "Sent",
    "Complete",
    "Archive"
  ]
  function handleChange(event){
    const {name, value} = event.target
    setProject({...project, [name]: value})
}
function handleCancel(){
    history.push("/")
}
async function handleSubmit(event){
    event.preventDefault()
    const abortController = new AbortController()
    try {
        await updateProject(project, project_id, abortController.signal)
        history.push("/")
        setProject({})
    } catch (error){
        console.error(error)
    }
    return () => abortController.abort()
}
return (
<div>
<header className="jumbotron jumbotron-fluid" style={{background: "black", color: "white", textAlign: "center"}}>
<h1 className="display-4">Edit Project</h1>
</header>
<div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
<form onSubmit={handleSubmit} style={{width: "600px", backgroundColor: "lightgrey"}}>
    <label htmlFor="project_name" style={{width: "100%"}}>
        <b>Project Name:</b>
        <br />
    <input
    id="project_name"
    type="text"
    name="project_name"
    value={project.project_name}
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
    value={project.client}
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
    value={project.status}
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
    value={project.notes}
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




export default EditProject