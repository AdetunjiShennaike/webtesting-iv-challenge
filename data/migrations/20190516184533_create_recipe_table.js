
exports.up = function(knex, Promise) {
  return knex.schema.createTable('recipes', tbl => {
    //primary key
    tbl.increments();

    //table data
    //name
    tbl
    .string('recipeName', '128')
    .notNullable()
    .unique()

    //instructions
    tbl
    .string('instructions')
    .notNullable()

    //notes
    tbl
    .string('notes', '128')

    //foreign key
    tbl
    .integer('dish_id')
    .unsigned()
    .references('id')
    .inTable('dishes')
    .notNullable()
    .onDelete('RESTRICT')
    .onUpdate('CASCADE')
    
  })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('recipes');
};