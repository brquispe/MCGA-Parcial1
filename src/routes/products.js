const productController = require('../controllers/products');
const express = require('express');
const router = express.Router();

router.get('/products', productController.getProductList);

module.exports = router;
