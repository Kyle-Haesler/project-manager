const knex = require("../db/connection")


function list(){
    return knex("projects").select("*").returning("*")
}

function read(project_id){
    return knex("projects").select("*").where("project_id", project_id).returning("*").then((projects) => projects[0])
}

function create(project){
    return knex("projects").insert(project).returning("*").then((createdProject) => createdProject[0])
}
function updateStatus(project_id, data){
    return knex("projects").select("*").where("project_id", project_id).update(data, "*").then((updatedProject) => updatedProject[0])
}
function update(project_id, project){
    return knex("projects").select("*").where("project_id", project_id).update(project, "*").then((updatedProject) => updatedProject[0])
}


module.exports = {
    create,
    list,
    read,
    update,
    updateStatus
}