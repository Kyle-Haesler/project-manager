const knex = require("../db/connection")


function list(){
    return knex("projects").select("*").returning("*")
}

function create(project){
    return knex("projects").insert(project).returning("*").then((createdProject) => createdProject[0])
}


module.exports = {
    create,
    list
}