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

const createProduct = async (req, res) => {
  const newProductData = {
    id: req.body.id,
    name: req.body.name,
    stock: req.body.stock,
    price: req.body.price,
    description: req.body.description
  };

  try {
    const newProduct = new Product(newProductData);
    await newProduct.save();
    res.status(201).json({
      error: false,
      message: 'Product created!',
      data: newProduct
    });
  } catch (error) {
    res.json({
      error: true,
      message: error
    })
  }
}

module.exports = {
  getProductList,
  getProductByNameOrId,
  createProduct
};
