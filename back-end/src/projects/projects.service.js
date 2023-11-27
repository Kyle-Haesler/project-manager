const knex = require("../db/connection");

function list() {
  return knex("projects").select("*").returning("*");
}

function read(project_id) {
  return knex("projects")
    .select("*")
    .where("project_id", project_id)
    .returning("*")
    .then((projects) => projects[0]);
}

function create(project) {
  return knex("projects")
    .insert(project)
    .returning("*")
    .then((createdProject) => createdProject[0]);
}
function updateStatus(project_id, data) {
  return knex("projects")
    .select("*")
    .where("project_id", project_id)
    .update(data, "*")
    .then((updatedProject) => updatedProject[0]);
}
function update(project_id, project) {
  return knex("projects")
    .select("*")
    .where("project_id", project_id)
    .update(project, "*")
    .then((updatedProject) => updatedProject[0]);
}
function destroy(project_id) {
  return knex("projects").where("project_id", project_id).del();
}
// case insensitive partial match for project_name, client, notes, status or tag
function search(searchData) {
  const searchTerm = `%${searchData}%`;
  return knex("projects")
    .select("*")
    .whereRaw(
      "LOWER(project_name) like LOWER(?) OR LOWER(client) like LOWER(?) OR LOWER(notes) like LOWER(?) OR LOWER(tag) like LOWER(?) OR LOWER(status) like LOWER(?)",
      [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm]
    )
    .returning("*");
}

module.exports = {
  create,
  list,
  read,
  update,
  updateStatus,
  delete: destroy,
  search,
};
