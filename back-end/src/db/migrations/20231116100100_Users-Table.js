exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.string("name");
    table.string("user_name").primary().unique().notNullable();
    table.string("password");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
