//var fs = require('fs');
var db = require('../models/db');
var Pool = db.Pool;

module.exports.getSlides = function (req, res) {
    const pool = new Pool({
      user: process.env.DBUSER,
      host: process.env.DBHOST,
      database: process.env.DATABASE,
      password: process.env.DBPASSWORD,
      port: process.env.DBPORT
    });
    pool.query('SELECT * from items', (err, client) => {
      if (err) {
        console.log(err);
      } else {
        console.log(client.rows);
        res.status(200)
        res.json(client.rows);
      }
      pool.end()
    })
}

module.exports.addSlide = function (req, res) {
  const userInput = {
    text: 'INSERT INTO items(title, description, image, embedded) VALUES($1, $2, $3, $4)',
    values: [req.body.title, req.body.description, req.body.image, req.body.embedded],
  }
  console.log(userInput.values);
  const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DATABASE,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT
  });
  pool.query(userInput, (err, client) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200)
      res.json({
          status: 'success',
          message: 'Inserted one item'
      });
    }
    pool.end()
  })
}

module.exports.removeSlide = function (req, res) {
  const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DATABASE,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT
  });
  var removedSlide = {
    text: 'DELETE FROM items WHERE id = $1',
    values: [req.params.slide_id]
  }
  pool.query(removedSlide, (err, client) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200)
      res.json({
          status: 'success',
          message: 'Removed one item'
      });
    }
    pool.end()
  })
}
