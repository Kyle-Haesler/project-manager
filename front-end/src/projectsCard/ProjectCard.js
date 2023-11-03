import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";
import { updateProjectStatus } from "../utils/api";
// todo: add errorhandler here

function ProjectCard({project}){
    const availableStatuses = [
        "Discovery",
        "Waiting",
        "In-Progress",
        "Sent",
        "Complete",
        "Archive"
    ]
    const history = useHistory()
    const currentStatusIndex = availableStatuses.indexOf(project.status)
    
    async function handleMoveBack(){
        const abortController = new AbortController()
        let newIndex;
        if(currentStatusIndex === 0){
            newIndex = availableStatuses.length - 1
        } else {
            newIndex = currentStatusIndex - 1
        }
        await updateProjectStatus(availableStatuses[newIndex], Number(project.project_id), abortController.signal)
        window.location.reload()
        return () => abortController.abort()
    }
    async function handleMoveForward(){
        const abortController = new AbortController()
        let newIndex;
        if(currentStatusIndex === availableStatuses.length -1){
            newIndex = 0
        } else {
            newIndex = currentStatusIndex + 1
        }
        await updateProjectStatus(availableStatuses[newIndex], Number(project.project_id), abortController.signal)
        window.location.reload()
        return () => abortController.abort()
    }



    return (
        
        <div className="card">
            <h5 className="card-header">Project Name: {project.project_name}</h5>
            <div className="card-body">
                <h5 className="card-title">Client: {project.client}</h5>
                <h6 className="card-title">Status: {project.status}</h6>
                <p className="card-text">{project.notes}</p>
                <button type="button" class="btn btn-primary" onClick={handleMoveBack}>Back</button>
                <button type="button" class="btn btn-primary" onClick={handleMoveForward}>Forward</button>
            </div>
        </div>
    )
}


export default ProjectCard