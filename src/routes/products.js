const productController = require('../controllers/products');
const express = require('express');
const router = express.Router();

router.get('/products', productController.getProductList);
router.get('/products/:id', productController.getProductByNameOrId);

module.exports = router;
