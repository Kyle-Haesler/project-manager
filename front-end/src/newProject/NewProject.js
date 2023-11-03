import React, {useState} from "react"
import { useHistory } from "react-router-dom";
import { createProject } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function NewProject(){
const initialFormState = {
    project_name: "",
    client: "",
    status: "",
    notes: "", 
}
const availableStatuses = [
    "Discovery",
    "Waiting",
    "In-Progress",
    "Sent",
    "Complete",
    "Archive"
  ]
const history = useHistory()
const [formData, setFormData] = useState({...initialFormState})
const [projectsError, setProjectsError] = useState(null)


function handleChange(event){
    const {name, value} = event.target
    setFormData({...formData, [name]: value})
}
function handleCancel(){
    history.push("/")
}
async function handleSubmit(event){
    setProjectsError(null)
    event.preventDefault()
    const abortController = new AbortController()
    try {
        await createProject(formData, abortController.signal)
        history.push("/")
        setFormData({...initialFormState})
    } catch (error){
        setProjectsError(error)
    }
    return () => abortController.abort()
}


return (
    <div>
        <header className="jumbotron jumbotron-fluid" style={{background: "black", color: "white", textAlign: "center"}}>
      <h1 className="display-4">Create New Project</h1>
    </header>
        <form onSubmit={handleSubmit} className="form-group">
            <label htmlFor="project_name">
                Project Name:
            <input
            id="project_name"
            className="form-control"
            type="text"
            name="project_name"
            value={formData.project_name}
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
            value={formData.client}
            onChange={handleChange}
            required
            />
            </label>
            <br />
            <label htmlFor="status">Select a Status: </label>
            <select
            id="status"
            name="status"
            value={formData.status}
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
            value={formData.notes}
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




export default NewProject