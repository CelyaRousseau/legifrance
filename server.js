
/**
 * Module dependencies
 */

var express = require('express'),
    routes  = require('./routes'),
    api     = require('./routes/api'),
    neo4j   = require('node-neo4j'),
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

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});