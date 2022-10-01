const Product = require('../models/Products');

const getProductList = async (req, res) => {
  const products = await Product.find();
  res.json(products);
}

const getProductByNameOrId = async (req, res) => {
  const nameOrId = req.params.id;
  const product = await Product.findOne({ $or: [
    { name: nameOrId },
    { id: nameOrId }
  ] })

  if (!product) {
    return res.status(404).json({
      error: true,
      message: 'Product not found!'
    })
  }

  res.json(product);
}

module.exports = {
  getProductList,
  getProductByNameOrId
};
