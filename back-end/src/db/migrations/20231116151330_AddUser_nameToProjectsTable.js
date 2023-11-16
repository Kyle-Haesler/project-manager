exports.up = function (knex) {
  return knex.schema.table("projects", function (table) {
    table.string("user_name").references("user_name").inTable("users");
  });
};

exports.down = function (knex) {
  return knex.schema.table("projects", function (table) {
    table.dropColumn("user_name");
  });
};
