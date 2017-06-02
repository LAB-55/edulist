const MongoClient = require('mongodb').MongoClient;
var getSlug = require('speakingurl');
var i = 0;
MongoClient.connect('mongodb://jimish:alapalap@ds143081.mlab.com:43081/edulist', (err, database) => {
 	if (err) return console.log(err)
 	// console.dir(database.colleges);
	colleges = database.collection('colleges');
	colleges.find().forEach((doc)=> {
 		var s = getSlug(doc.name);
 		var name = doc.name;
 		i++;
 		flag = false;
 			var last = s.split('-');
 				last = last.pop();

 		if ( s.includes("government-polytechnic") || s.includes("govt-polytechnic") ){

 			if( last == "girls" || last =="women" || last == "polytechnic" || last == "college"  ){
 				flag = true;
 				if( doc.tvs ){	
	 				s = s + "-" + getSlug(doc.tvs);
	 				name = name + ", " + doc.tvs.toLowerCase();
	 				
	 				if( doc.tvs.toLowerCase() != doc.district.toLowerCase() ){
	 					s = s + "-" + getSlug(doc.district);
	 					name = name + ", " + doc.district.toLowerCase();
	 				}
 				}else if(doc.district){
						s = s + "-" + getSlug(doc.district);
	 					name = name + ", " + doc.district.toLowerCase();
 				}
 			}
			// console.log("---------");
			if (flag)
			console.log(i,s, name );
 		}
		colleges.update({ _id : doc._id },{
				$set: {
						"uri" : s,
						"name" : name,
						"country": "india",
						"prefix" : "in"
					  }
			}, false, true);
})

})


