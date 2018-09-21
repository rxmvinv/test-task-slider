var express = require('express');
var router = express.Router();
var ctrlSlides = require('../controllers/slides');

//Slides data
router.get('/slides', ctrlSlides.getSlides);
router.post('/slides', ctrlSlides.addSlide);
router.delete('/slides/:slide_id', ctrlSlides.removeSlide);

module.exports = router;
