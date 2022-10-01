const express = require('express');
const mongoose = require('mongoose');
const homeRoutes = require('./routes');
const productsRoutes = require('./routes/products');

require('dotenv').config();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DB_URL;

const app = express();
app.use(express.json());

app.use(homeRoutes);
app.use(productsRoutes);

mongoose.connect(DATABASE_URL).then(() => {
  console.log('DB Connected!');

  app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
  })
}).catch(err => {
  console.log('There was an error on the DB connection');
  console.log(err);
})
