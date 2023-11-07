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
<form onSubmit={handleSubmit} className="form-group">
    <label htmlFor="project_name">
        Project Name:
    <input
    id="project_name"
    className="form-control"
    type="text"
    name="project_name"
    value={project.project_name}
    onChange={handleChange}
    required
    />
    </label>
    <br />
    <label htmlFor="client">
        Client: 
    <input
    id="client"
    className="form-control"
    type="text"
    name="client"
    value={project.client}
    onChange={handleChange}
    required
    />
    </label>
    <br />
    <label htmlFor="status">Select a Status: </label>
    <select
    id="status"
    name="status"
    value={project.status}
    className="form-control"
    onChange={handleChange}
    required
    >
        <option value="">Select a Status...</option>
        {availableStatuses.map((status) => (
            <option value={status}>{status}</option>
        ))}
    </select>
    <label htmlFor="notes">
        Notes:
    <input
    id="notes"
    className="form-control"
    type="text"
    name="notes"
    value={project.notes}
    onChange={handleChange}
    />
    </label>
    <br />
    <button type="submit" className="btn btn-primary mr-2">Submit</button>
    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
</form>
</div>
)

}




export default EditProject