
/**
 * Module dependencies
 */

var express = require('express'),
    request = require('request'),
    cheerio = require('cheerio'),
    routes  = require('./routes'),
    api     = require('./routes/api'),
    neo4j   = require('node-neo4j'),
    http    = require('http'),
    path    = require('path'),
    fs      = require('fs');

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

app.get('/code', function(req, res) {

  fs.readFile('./pdf_to_html/code_civil.htm',{encoding: 'utf-8'}, function (err,data) {
    if (err) {
        return console.log(err);
      }
      // console.log(data);
  

    var json = {};

    var $ = cheerio.load(data),
        // $body = $('data').find('body');
        $code_nom = $('.ft0').first().text();
        json.code_title = $code_nom;

        console.log($code_nom);
        json.articles = new Array();
        $('.ft1').each(function( index ) {
          var ref = $( this ).text();
          var texte;

          $(this).find('.ft2').each(function( i,texte) {
            texte += $( this ).text();
            return texte;
          });

          var ob = {reference:ref, texteLoi:texte};

          // var texte = $('.ft2').text();
          // json.article[index].ref = ref;
          json.articles.push(ob);
        });

    // $livres.each(function(i, item) {
    //   var $a = $(item).find('.feed-item-thumb').children('a'),
    //       $title = $(item).find('.feed-video-title').text(),
    //       $time = $a.find('.video-time').text(),
    //       $img = $a.find('span.yt-thumb-clip-inner img');
    // });
    
    // json = JSON.stringify(json);
    // res.contentType('application/json');
    // // res.render('list', {
    // //   title: 'Code en JSON',
    // //   json: json
    // response.json();
    // // });
    
    res.send(json);
  });
});

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});