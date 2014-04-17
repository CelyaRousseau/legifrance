
/**
 * Module dependencies
 */

var express = require('./app/node_modules/express'),
    request = require('./app/node_modules/request'),
    cheerio = require('./app/node_modules/cheerio'),
    parser  = require('./app/lib/Text2JsonCode'),
    neo4j   = require('./app/node_modules/node-neo4j'),
    routes  = require('./routes'),
    api     = require('./routes/api'),
    http    = require('http'),
    path    = require('path');

var app     = module.exports = express();
var router  = express.Router();

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 8124);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(router);

// development only
if (app.get('env') === 'development') {
  // app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
}

// Routes

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/name', api.name);

app.get('/xml', function(req, res) {
  parser.parse();
  res.end();
});

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});