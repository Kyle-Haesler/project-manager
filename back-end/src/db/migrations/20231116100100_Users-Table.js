exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("user_id").primary();
    table.string("name");
    table.string("user_name");
    table.string("password");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
