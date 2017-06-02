const MongoClient = require('mongodb').MongoClient;
var getSlug = require('speakingurl');
var i = 0;

var jsonfile = require('jsonfile')
var file = './data.json';

jsonfile.readFile(file, (err, obj)=> {
  dobj = obj;
})
i = 0;
MongoClient.connect('mongodb://jimish:alapalap@ds143081.mlab.com:43081/edulist', (err, database) => {
 	if (err) return console.log(err)
	colleges = database.collection('colleges');
		dobj.forEach((elm) => {
			var s = getSlug(elm.name);
				colleges.update({ uri : s  },
				{
					$set: elm
				}, false, true, ()=>{
					i++;
					console.log(i,s);
					
				});	
		})// foreach
})// mongo
