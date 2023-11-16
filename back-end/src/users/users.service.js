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

module.exports = {
  read,
  create,
};
