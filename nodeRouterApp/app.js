var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.port || 3000;

var app = express();
var apiai = require('apiai');
var apiapp = apiai("4155768d2ec44c59bd45b146fa5f3fac");

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
  res.send('Hello world!!');
});

app.post('/chat', function(req, res){
  console.log(req.body.chatText);
  var request = apiapp.textRequest(req.body.chatText, {
    sessionId: '123123'
  });
  request.on('response', function(response) {
      console.log(response);
      res.send(response);
  });
  request.on('error', function(error) {
      console.log(error);
      res.send(error);
  });
  request.end();
});

app.listen(port, function(){
  console.log('server started on Port 3000...')
});