var fs = require('fs');
var uuidv4 = require('uuid/v4');
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

  var userImage = '';
  if (req.body.image.split(';')[1]) {
    var imgType = req.body.image.split(';')[0];
    var imgHeader = imgType.split('/')[1];
    var genHeader = uuidv4();
    if (imgHeader == "jpeg") {
      imgHeader = 'images/' + genHeader + '.jpg';
    } else {
      imgHeader = 'images/' + genHeader + '.' + imgHeader;
    }
    var decodedImg = req.body.image.split(',')[1];
    var data = fs.writeFile('public/' + imgHeader, decodedImg, 'base64', function(err) {
      console.log(err);
    });
    userImage = imgHeader;
  } else {
    userImage = 'images/default-slide-bg.png'
  }

  const userInput = {
    text: 'INSERT INTO items(title, description, image, embedded) VALUES($1, $2, $3, $4)',
    values: [req.body.title, req.body.description, userImage, req.body.embedded],
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
