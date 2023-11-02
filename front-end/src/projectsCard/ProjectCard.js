


function ProjectCard({project}){
    return (
        
        <div className="card">
            <h5 className="card-header">Project Name: {project.project_name}</h5>
            <div className="card-body">
                <h5 className="card-title">Client: {project.client}</h5>
                <h6 className="card-title">Status: {project.status}</h6>
                <p className="card-text">{project.notes}</p>
                <button type="button" class="btn btn-primary">Move Back</button>
                <button type="button" class="btn btn-primary">Move Forward</button>
            </div>
        </div>
    )
}


export default ProjectCard