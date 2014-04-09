var express = require('express')
  // , routes = require('./routes')
  , cheerio = require('cheerio')
  , request = require('request')
  , url = require('url');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.get('/code', function(req, res) {
  request({uri: '/pdf_to_html/code_civil'}, function(err, response, body) {

    if (err && response.statusCode !== 200) {
      console.log('Request error.');
    }

    var json ={};

    var $ = cheerio.load(body),
        $body = $('body'),
        $livres = $body.find('.feed-item-content-wrapper');

    $livres.each(function(i, item) {
      var $a = $(item).find('.feed-item-thumb').children('a'),
          $title = $(item).find('.feed-video-title').text(),
          $time = $a.find('.video-time').text(),
          $img = $a.find('span.yt-thumb-clip-inner img');
    });

    res.render('list', {
      title: 'Code en JSON',
      json: json

    });
  });
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});