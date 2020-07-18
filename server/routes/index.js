const express = require('express');
const router = express.Router();

const ProductController = require('../product/controller');

router.get('/api/items', ProductController.listItems);
router.get('/api/items/:id', ProductController.getItem);

module.exports = router;