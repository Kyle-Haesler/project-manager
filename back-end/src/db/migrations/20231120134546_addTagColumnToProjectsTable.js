exports.up = function (knex) {
  return knex.schema.table("projects", function (table) {
    table.string("tag").default("Red");
  });
};

exports.down = function (knex) {
  return knex.schema.table("projects", function (table) {
    table.dropColumn("tag");
  });
};
