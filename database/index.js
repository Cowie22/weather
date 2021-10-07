const mysql = require('mysql2/promise');
const config = require('./config.js');

const pool = mysql.createPool(config)

