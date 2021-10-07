const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
// const { getAllCities, addCity } = require('../database/index');

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/public')));


const PORT = process.env.PORT || 2222;

app.listen(PORT, () => {
  console.log(`Web server running on: http://localhost:${PORT}`);
});