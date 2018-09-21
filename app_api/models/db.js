require('dotenv').load();
const { Pool, Client } = require('pg')

let initialQuery = `
CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(80) not null,
  description TEXT not null,
  image VARCHAR(80) null,
  embedded VARCHAR(80) null
);
`;

const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DATABASE,
  password: process.env.DBPASSWORD,
  port: process.env.DBPORT
})

pool.query(initialQuery, (err, res) => {
  console.log(err, res)
  pool.end()
})

module.exports = {Pool, Client};
