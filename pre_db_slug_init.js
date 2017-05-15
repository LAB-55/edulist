const MongoClient = require('mongodb').MongoClient;
var getSlug = require('speakingurl');
var i = 0;
MongoClient.connect('mongodb://jimish:alapalap@ds143081.mlab.com:43081/edulist', (err, database) => {
 	if (err) return console.log(err)
 	// console.dir(database.colleges);
	colleges = database.collection('colleges');
	colleges.find().forEach((doc)=> {
 		i++;
		
		colleges.update({ _id : doc._id },{
				$set: {
						"uri":getSlug(doc.name)
					  }
			}, false, true);
		// console.log(doc.uri);
	})

})