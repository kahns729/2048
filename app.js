var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());

app.get('/',function(request,response){
	response.send('hello world');
});

app.get('/scores.json',function(request,response){
	response.send('getting scores');
});

app.post('/submit.json',function(request,response){
	data = request.body.somedata;
})

var port = Number(process.env.PORT || 3000);

app.listen(port);