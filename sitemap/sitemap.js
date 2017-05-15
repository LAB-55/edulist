var sm = require('sitemap');
var fs = require('fs');

module.exports = (res)=>{

  var pageUrls = [];
  db.collection('colleges').find({}).toArray((err,docs) => {
    if(docs){
      for(var i=0;i<docs.length;i++){
        var obj = {url:"/college/"+docs[i].prefix+"/"+docs[i].uri, changefreq: 'daily', priority: 0.9};
        pageUrls.push(obj);
      }
    }
    var sitemap = sm.createSitemap ({
      hostname: 'http://www.edulist.in',
      cacheTime: 600000,
      urls: pageUrls
    });
    sitemap.toXML((err, xml) => {
      if (err) return res.status(500).end();
      fs.writeFile(__dirname + "/../views/xmlsitemap.ejs", xml, (err)=> { if(err) return console.log(err) }); 
    });
   res.end('sitemap upddated')
  });
}