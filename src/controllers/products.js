const Product = require('../models/Products');

const getProductList = async (req, res) => {
  const products = await Product.find();
  res.json(products);
}

module.exports = {
  getProductList
};
