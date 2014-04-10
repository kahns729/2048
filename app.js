var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());

function sortDescending(scoresArray){
	scoresArray.sort(function(entry1,entry2){
		return (+entry2.score) - (+entry1.score);
	})
}


app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

//MongoDB
var mongo = require('mongodb');

var mongoUri = process.env.MONGOLAB_URI ||
	process.env.MONGOHQ_URL ||
	'mongodb://localhost/2048';

app.get('/',function(request,response){
	// response.sendfile(__dirname + '/index.html');
	var indexPage = "";
	mongo.Db.connect(mongoUri, function(error, db){
		db.collection('scores', function(err,collection){
			collection.find().sort({ score: -1 }).toArray(function(err, items){
				if(!err){
					indexPage += "<!DOCTYPE html><html><head><title>2048 Game Center</title></head><body><h1>"
					+ "2048 Game Center</h1><table><tr><th>User</th><th>Score</th><th>Timestamp</th></tr>";
					for (i = 0; i < items.length; i++){
						indexPage += "<tr><td>" + items[i].username + "</td><td>" + items[i].score + 
							"</td><td>" + items[i].created_at + "</td></tr>";
					}
					indexPage += "</table></body></html>";
					response.send(indexPage);
				}
				else{};
			});
		});
	});

});

app.get('/scores.json',function(request,response){
	if (request.query.username){
		var username = request.query.username;
		mongo.Db.connect(mongoUri, function(error, db){
			db.collection('scores', function(err,collection){
				collection.find({"username":username}).sort({ score: -1 }).toArray(function(err, items){
					response.send(items);
				});
			});
		});
	}
	else {
		response.send([]);
	}
});

app.post('/submit.json',function(request,response){
	if (request.body.username && request.body.score && request.body.grid){
		mongo.Db.connect(mongoUri, function(error, db) {
			db.collection('scores', function(err, collection){
				var record = {
					"username":request.body.username,
					"score":+request.body.score,
					"grid":request.body.grid,
					"created_at": new Date().getTime()
				}
				collection.insert(record, {safe:true}, function(er,records){
					console.log("inserted new record");	
				});
			});
		});
	}
});

var port = Number(process.env.PORT || 3000);

app.listen(port);