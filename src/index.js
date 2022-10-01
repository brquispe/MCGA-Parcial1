const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get('', (req, res) => res.send('<h1>Hello world</h1>'));

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
})
