const knex = require("../db/connection");

function read(user_name) {
  return knex("users")
    .select("*")
    .where("user_name", user_name)
    .returning("*")
    .then((users) => users[0]);
}

function create(user) {
  return knex("users")
    .insert(user)
    .returning("*")
    .then((createdUsers) => createdUsers[0]);
}
function login(user_name, password) {
  return knex("users")
    .select("*")
    .where("user_name", user_name)
    .where("password", password)
    .returning("*")
    .then((users) => users[0]);
}

module.exports = {
  read,
  create,
  login,
};
