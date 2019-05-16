//import express and set route
const express = require('express');
const router = express.Router();

//import db
const recipes = require('../data/models/recipeModel');

//set error msgs
const sendError = (msg, res) => {
  res.status(500).json({ error: `${msg}`});
};

const missingError = res => {
  res.status(404).json({ error: 'This action does not exist'});
};

const newError = (sts, msg, res) => {
  res.status(sts).json({ error: `${msg}` })
}

//set middleware

//CRUD requests
//get actions
router.get('/', (req, res) => {
  recipes
  .get()
  .then( recipe => {
    res.status(200).json({ recipe });
  })
  .catch( err => {
    return sendError( err, res );
  })
})

//by id
router.get('/:id', (req, res) => {
  //set ID
  const ID = req.params.id
  
  recipes
  .getById(ID)
  .then( recipe => {
    if(recipe === undefined) {
      return missingError(res);
    }
    else {
      return res.status(200).json({ recipe });
    }
  })
  .catch( err => {
    return sendError( err, res );
  })
})

//get ingredients
router.get('/:id/ingredients', (req, res) => {
  //set ID
  const ID = req.params.id
  
  recipes
  .getIngredients(ID)
  .then( recipe => {
    if(recipe === undefined) {
      return missingError(res);
    }
    else {
      return res.status(200).json({ recipe });
    }
  })
  .catch( err => {
    return sendError( err, res );
  })
})

//get recipe completely
router.get('/:id/recipe', (req, res) => {
  //set ID 
  const ID = req.params.id

  recipes 
  .getRecipe(ID)
  .then( recipe => {
    if(recipe === undefined) {
      return missingError(res);
    }
    else {
      return res.status(200).json({ recipe });
    }
  })
  .catch( err => {
    return sendError( err, res );
  })
})

//post request
router.post('/', (req, res) => {
  //set req body
  const { name, dish_id, instructions, notes } = req.body;
  const newRecipe = { name, dish_id, instructions, notes };

  //check req body
  if ( !name || !dish_id || !instructions ) { 
    return newError( 406, 'Missing Recipe Name, Dish ID, or Instructions!', res );
  }
  recipes
  .insert(newRecipe)
  .then( recipe => {
    res.status(201).json({ recipe });
  })
  .catch( err => {
    return sendError( err , res );
  })
})

//update request
router.put('/:id', (req, res) => {
  //set ID
  const ID = req.params.id
  
  //set req body
  const { name, dish_id, instructions, notes } = req.body;
  const newRecipe = { name, dish_id, instructions, notes };

  //check req body
  if ( !name || !dish_id || !instructions ) { 
    return newError( 406, 'Missing Recipe Name, Dish ID, or Instructions!', res );
  }
  recipes
  .update(ID, newRecipe) 
  .then( recipe => {
    if(recipe === undefined) {
    return missingError(res);
    }
    else {
      return res.status(202).json({ recipe });
    }
  })
  .catch( err => {
    return sendError( err , res );
  })
})

router.delete('/:id', (req, res) => {
  //set ID
  const ID = req.params.id
  
  recipes
  .remove(ID)
  .then( recipe => {
    if(recipe === undefined) {
      return missingError(res);
    }
    else {
      return res.status(202).json({ recipe });
    }
  })
  .catch( err => {
    return sendError( err, res );
  })
})

//export
module.exports = router;