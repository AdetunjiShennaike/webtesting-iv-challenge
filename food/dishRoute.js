//import express and set route
const express = require('express');
const router = express.Router();

//import db
const dishes = require('../data/models/dishModel');

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
  dishes
  .get()
  .then( dish => {
    res.status(200).json({ dish });
  })
  .catch( err => {
    return sendError( err, res );
  })
})

//by id
router.get('/:id', (req, res) => {
  //set ID
  const ID = req.params.id
  
  dishes
  .getById(ID)
  .then( dish => {
    if(dish === undefined) {
      return missingError(res);
    }
    else {
      return res.status(200).json({ dish });
    }
  })
  .catch( err => {
    return sendError( err, res );
  })
})

//get recipes
router.get('/:id/recipes', (req, res) => {
  //set ID
  const ID = req.params.id
  
  dishes
  .getRecipes(ID)
  .then( dish => {
    if(dish === undefined) {
      return missingError(res);
    }
    else {
      return res.status(200).json({ dish });
    }
  })
  .catch( err => {
    return sendError( err, res );
  })
})

//post request
router.post('/', (req, res) => {
  //set req body
  const { name } = req.body;
  const newDish = { name };

  //check req body
  if ( !name ) { 
    return newError( 406, 'Missing Dish Name!', res );
  }
  dishes
  .insert(newDish)
  .then( dish => {
    res.status(201).json({ dish });
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
  const { name } = req.body;
  const newDish = { name };

  //check req body
  if ( !name ) { 
    return newError( 406, 'Missing Dish Name!', res );
  }
  dishes
  .update(ID, newDish) 
  .then( dish => {
    if(dish === undefined) {
    return missingError(res);
    }
    else {
      return res.status(202).json({ dish });
    }
  })
  .catch( err => {
    return sendError( err , res );
  })
})

router.delete('/:id', (req, res) => {
  //set ID
  const ID = req.params.id
  
  dishes
  .remove(ID)
  .then( dish => {
    if(dish === undefined) {
      return missingError(res);
    }
    else {
      return res.status(202).json({ dish });
    }
  })
  .catch( err => {
    return sendError( err, res );
  })
})

//export
module.exports = router;