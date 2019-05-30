var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var jwt             = require('jsonwebtoken');
const logger        = require('morgan');
const movies        = require('./routes/movies') ;
const users         = require('./routes/users');
const projects      = require('./routes/projects');
const materials     = require('./routes/materials');
const companies     = require('./routes/companies');
const listmaterials = require('./routes/listmaterials');
const shipments     = require('./routes/shipments');
const reports       = require('./routes/reports');
const activities    = require('./routes/defaultActivities');
const timeline      = require('./routes/timeline');
const test          = require('./routes/test');
const dailyreport   = require('./routes/dailyReport');
const mongoose      = require('./config/database'); //database configuration
var bluebird        = require('bluebird');

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.Promise = bluebird;
app.set('secretKey', 'ACZ6e9tDsnIDZIhibPOi'); // jwt secret token

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})

app.get('/', function(req, res){
    res.json({"home" : "Home of the Pirates"});
});

// public route
app.use('/users', users);
app.use('/projects', projects);
app.use('/materials', materials);
app.use('/companies', companies);
app.use('/listmaterials', listmaterials);
app.use('/shipments', shipments);
app.use('/reports', reports);
app.use('/defaultactivities', activities);
app.use('/timeline', timeline);
app.use('/testing', test);
app.use('/dailyreport', dailyreport)
// private route
app.use('/movies', validateUser, movies);

/*app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});*/

function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"error", message: err.message, data:null});
    }else{
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
  
}
// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
/*app.use(function(req, res, next) {
 let err = new Error('Not Found');
    err.status = 404;
    next(err);
});*/
// handle errors
app.use(function(err, req, res, next) {
 console.log(err);
 
  if(err.status === 404)
   res.status(404).json({message: "Not found"});
  else 
    res.status(500).json({message: "Something looks wrong :( !!!"});
});


app.listen(63145);
//63145,'10.1.10.61' ||
app.listen( 63145,'localhost',function() {
  console.log('Application worker ' + process.pid + ' started...');
}
);
console.log('Listening on port 63145...');