const knex = require("../db/connection")

function create(project){
    return knex("projects").insert(project).returning("*").then((createdProject) => createdProject[0])
}


module.exports = {
    create
}