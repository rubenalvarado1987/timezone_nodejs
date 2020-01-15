var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var _ = require('lodash');
var datetime = require('node-datetime');

app.use(cors());
var server = require('http').createServer(app);

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

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));

// respond with "hello world" when a GET request is made to the homepage
app.post('/getTime', function(req, res) {
  
  console.log('query:',req.query.zona);

  if(req.query.zona){
    
    //se utiliza el npm de datetime
    var dt = datetime.create();

    //set now datetime UTC
    var now = new Date(dt.now());

    console.log('now',now);

    // agrega o quita 
    dt.offsetInHours(parseInt(req.query.zona));

    console.log(dt);

    //se retorna la hora con su conversión.
    
    res.json({ response : 
                  {
                    time: dt._now,
                    timezone: 'utc'
                  } 
    });

  }else{
    res.json({ response : 
                {
                  error: 'error en los parametros enviados'
                } 
    });
  }
});

var port = process.env.PORT || 3000;

server.listen(port, ()=> {
    console.log('Running on port 3000');
});