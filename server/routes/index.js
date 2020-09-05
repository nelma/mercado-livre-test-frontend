const express = require('express');
const router = express.Router();

const ProductController = require('../product/controller');

router.get('/apis/items', ProductController.listItems);
router.get('/apis/items/:id', ProductController.getItem);

module.exports = router;