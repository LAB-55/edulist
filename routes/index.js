var express = require('express');
var router = express.Router();
	
var getSlug = require('speakingurl');
var slug = getSlug("Schöner --....... !? Bel été !");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: slug });
});

module.exports = router;
