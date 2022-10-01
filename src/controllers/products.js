const Product = require('../models/Products');

const getProductList = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const getProductByNameOrId = async (req, res) => {
  const nameOrId = req.params.id;
  const product = await Product.findOne({
    $or: [{ name: nameOrId }, { id: nameOrId }],
  });

  if (!product) {
    return res.status(404).json({
      error: true,
      message: 'Product not found!',
    });
  }

  res.json(product);
};

const createProduct = async (req, res) => {
  const newProductData = {
    id: req.body.id,
    name: req.body.name,
    stock: req.body.stock,
    price: req.body.price,
    description: req.body.description,
  };

  try {
    const newProduct = new Product(newProductData);
    await newProduct.save();
    res.status(201).json({
      error: false,
      message: 'Product created!',
      data: newProduct,
    });
  } catch (error) {
    res.json({
      error: true,
      message: error,
    });
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({ id });

  if (!product) {
    return res.status(404).json({
      error: true,
      message: 'Product not found!',
    });
  }

  try {
    await product.delete();
    return res.status(204);
  } catch (error) {
    res.json({
      error: true,
      message: error,
    });
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({ id });

  if (!product) {
    return res.status(404).json({
      error: true,
      message: 'Product not found!',
    });
  }

  try {
    product.id = req.body.id || product.id;
    product.name = req.body.name || product.name;
    product.stock = req.body.stock || product.stock;
    product.price = req.body.price || product.price;
    product.description = req.body.description || product.description;

    const result = await product.save();
    return res.json({
      message: 'Product updated!',
      error: false,
      data: result,
    });
  } catch (error) {
    return res.json({
      message: error,
      error: true,
    });
  }
};

module.exports = {
  getProductList,
  getProductByNameOrId,
  createProduct,
  deleteProduct,
  updateProduct
};
