const express = require('express');
const router = express.Router();

const controller = require('../controller/bucket-lists');

router.get('/', controller.getAll);

router.post('/', controller.createNew);

router.get('/:id', controller.getSingle);


router.put('/:id', controller.updateItem);

router.delete('/:id');

module.exports = router;