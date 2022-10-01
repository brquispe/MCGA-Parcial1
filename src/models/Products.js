const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  id: {
    type: String,
    unique: true,
    null: false
  },
  name: String,
  price: Number,
  stock: Number,
  description: String
});

module.exports = mongoose.model('products', ProductSchema);
