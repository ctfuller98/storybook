const ObjectId = require('mongodb').ObjectId;
const connect = require('../config/db')

const getAll = async (req, res) => {
  const results = connect.getCollection();
  
  results.then((documents) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(documents);
    console.log('Returned All')
  });
};

const getSingle = async (req, res) => {
    const itemid = new ObjectId(req.params.id)
    const results = connect.getCollection()({_id: itemid});
    if (itemid == null ) {
      throw new Api404Error(`Bucket List Item with id: ${req.params.id} not found.`)
    }
    else {
    results.toArray().then((documents) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(documents[0]);
    console.log(`Returned Contact ${req.params.id}`)
  });
      
    }
    
};

const createNew = async (req, res) => {
  try {
  const result = await authSchema.validateAsync(req.body);
  const response = await connect.getCollection().insertOne(result);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the list item.');
  }
  }
  catch (error) {
    console.log(error)
    if (error.isJoi === true) {
      error.status = 422;
    }
  }

};

const updateItem = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const item = {
    name: req.body.name,
    type: req.body.type,
    price: req.body.price,
    city: req.body.city,
    month: req.body.month,
    year: req.body.year,
    country:req.body.country
  };
    const result = await authSchema.validateAsync(req.body);
    const response = await connect
    .getCollection()
    .replaceOne({ _id: userId }, item);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the item.');
  }
  }
  catch (error) {
    console.log(error)
    if (error.isJoi === true) {
      error.status = 422;
    }

  }
  
  
};

const deleteItem = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await connect.getCollection().deleteOne({ _id: userId }, true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the item.');
  }
};
module.exports = {
  getAll,
  getSingle,
  createNew,
  updateItem,
  deleteItem
};