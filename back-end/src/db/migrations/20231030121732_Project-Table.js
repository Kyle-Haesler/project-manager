
exports.up = function(knex) {
  return knex.schema.createTable("projects", function(table){
    table.increments("project_id").primary()
    table.string("project_name")
    table.string("client")
    table.string("status").default("discovery")
    table.text("notes")
    table.timestamps(true, true)

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("projects")
};
