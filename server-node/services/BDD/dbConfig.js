const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 10, // le nombre de connexions simultanées autorisées
  host: BDD_HOST,
  user: BDD_USER,
  database: BDD_DB,
  password: BDD_PWD
});

module.exports = pool.promise();
