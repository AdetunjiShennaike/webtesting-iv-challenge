//import knex from config file 
const db = require('../dbConfig');

//set up th exports
module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
  getRecipies,
}

//setup SQL functions
function get() {
  return db('dishes');
}

function getById(id) {
 return db('dishes')
 .where('id', id)
 .first()
}

function insert(dish) {
  return db('dishes')
  .insert( dish )
  .then( ids => {
    return getById(ids[0]);//returns the whole object
  })
}

function update(id, change) {
  return db('dishes')
  .where({ id })
  .update( change )
  .then( ids => {
    return getById(ids[0]);//returns the whole object
  })
}

function remove(id) {
  return db('dishes')
  .where('id', id)
  .del()
  .then( ids => {
    return getById(ids[0]);//returns the whole object
  })
}

function getRecipies(id) {
  return db('recipes')
  .where('dish_id', id)
  .then( recipes => recipes.map(recipe => { return {...recipe}}))
}