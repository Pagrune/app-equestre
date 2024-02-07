const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
      host: process.env.BDD_HOST,
      user: process.env.BDD_USER,
      password: process.env.BDD_PWD,
      database: process.env.BDD_DB,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
});

module.exports = pool; // Pas besoin de .promise() ici car nous utilisons déjà mysql2/promise
