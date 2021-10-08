const mysql = require('mysql2/promise');
const config = require('./config.js');

const pool = mysql.createPool(config)

async function getAllCities() {
  const queryStr = 'SELECT * FROM city';
  const result = await pool.query(queryStr);
  return result;
}

async function addCity(info) {
  const queryStr = 'INSERT INTO city (name, latitude, longitude) VALUES (?, ?, ?)';
  const params = [info.postCity, info.postLat, info.postLong];
  await pool.query(queryStr, params);
  return;
}

module.exports = {
  getAllCities,
  addCity,
}