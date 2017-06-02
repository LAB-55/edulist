var express = require('express');
var router = express.Router();
var getSlug = require('speakingurl');
var sitemap = require('../sitemap/sitemap');

String.prototype.toTitleCase = function() {
  var i, j, str, lowers, uppers;
  str = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

  lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At', 
  'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
  for (i = 0, j = lowers.length; i < j; i++)
      str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'), function(txt) {
        return txt.toLowerCase();
      });
  return str;
}

router.get('/', function(req, res, next) {
    res.render('index', { title: "Edulist" });
});

router.get('/update-sitemap', function(req, res, next) {
    sitemap(res);
});

router.get('/sitemap.xml', function(req, res, next) {
      res.header('Content-Type', 'application/xml');
      res.render('xmlsitemap'); 
});
router.get('/college/:cp/:uri', function(req, res, next) {
  var uri = req.params.uri.toLowerCase();
  var country_prefix = req.params.cp.toLowerCase();

  var template = [
          "Information about {clgName}, a premier college situated at {stateName} state of {country}.",
          "Information about {clgName}, one of among reputed institutes imparting finest quality education situated at {stateName} state of {country}.",
          "Information about {clgName}, located in {stateName} state of {country}.",
        ]
  var results = db.collection('colleges').findOne({ "uri" : uri }).then((p) => {
      p.name = p.name.toTitleCase();
      
      var t = 0;
      for (var i = 0; i < p.name.length; i++){ 
         p.name.charCodeAt(i).toString(2).split('').map((n)=>{ t+=parseInt(n) });
      }

      t = t % template.length;
      res.render('college_page', { 
          clg : p,
          meta : {
            template : template[t].replace("{clgName}", p.name)
                                  .replace('{stateName}', p.state)
                                  .replace('{country}', p.country),
            url : req.url
          } 
      });

   }).catch((e)=>{ console.error(e);
      res.render('error');
   });
  
});

module.exports = router;
