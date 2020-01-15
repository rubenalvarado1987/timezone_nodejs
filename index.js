var express = require('express');
var app = express();
var cors = require('cors');
var _ = require('lodash');

app.use(cors());
const server = require('http').createServer(app);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR");
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  if (req.method === 'OPTIONS') {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
 });  

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

var port = process.env.PORT || 3000;

server.listen(port, ()=> {
    console.log('Running on port 3000');
});