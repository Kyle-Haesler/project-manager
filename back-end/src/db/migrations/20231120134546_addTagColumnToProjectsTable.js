exports.up = function (knex) {
  return knex.schema.table("projects", function (table) {
    table.string("tag").default("red");
  });
};

exports.down = function (knex) {
  return knex.schema.table("projects", function (table) {
    table.dropColumn("tag");
  });
};
