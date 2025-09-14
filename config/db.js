const mysql = require('mysql2/promise');

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'user_bnbdog',
//   password: 'pass_bnbdog',
//   database: 'bnbdog',
//   connectionLimit: 10,
// });


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'arkcoin',
  connectionLimit: 10,
});

module.exports = pool;
