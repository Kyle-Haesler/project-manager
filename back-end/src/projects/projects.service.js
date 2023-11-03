const knex = require("../db/connection")


function list(){
    return knex("projects").select("*").returning("*")
}

function create(project){
    return knex("projects").insert(project).returning("*").then((createdProject) => createdProject[0])
}
function updateStatus(project_id, data){
    return knex("projects").select("*").where("project_id", project_id).update(data, "*").then((updatedProject) => updatedProject[0])
}


module.exports = {
    create,
    list,
    updateStatus
}