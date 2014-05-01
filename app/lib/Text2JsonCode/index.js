var fs     = require('fs'),
    byline = require('byline'),
    parser = require('xml2json');

exports.parse = function() {
  var stream  = byline(fs.createReadStream('sources/legitext.txt',{encoding: 'utf8'}));
  var divOpen = [{livre: false}, {titre: false}, {chapitre: false}, {section: false}, {sous_section: false}, {paragraphe: false },{article: false}];

  divOpen.closeTag = function(nb) {

    var divReturn = '';

    for (var i = divOpen.length-1; i >=0 ; --i) {
      var value = divOpen[i];
      for(var key in value)
        {
          if (i >= nb && value[key]) {
            divReturn += "</"+key+">";
          }
        }
    }
      return divReturn;
  };

  divOpen.reset = function(nb) {

     divOpen.forEach(function (value,index) {

        for(var key in value)
        {
          if (index >= nb && value[key]) {
            value[key]=false;
          }
        }

      });
  };

  fs.appendFileSync("sources/legitext.xml", "<root>", 'utf8');

  stream.on('data', function(line) {
    var text = '';

    var patternLivre       = new RegExp(/Livre [IVXCD]/g);
    var patternnom         = new RegExp(/Titre [IVXCD]/g);
    var patternChapitre    = new RegExp(/Chapitre [IVXCD]/g);
    var patternSection     = new RegExp(/Section \d/g);
    var patternSousSection = new RegExp(/Sous-section \d/g);
    var patternParagraphe  = new RegExp(/Paragraphe \d/g);
    var patternArticle     = new RegExp(/Article \d/g);

    if (patternLivre.test(line)) {
      text += divOpen.closeTag(0);
      text += "<livre><nom>" + line + "</nom>";
      fs.appendFileSync("sources/legitext.xml", text, 'utf8');
      divOpen[0].livre = true;
      divOpen.reset(1);
    } else if (patternnom.test(line)) {
      text += divOpen.closeTag(1);
      text += "<titre><nom>" + line + "</nom>";
      fs.appendFileSync("sources/legitext.xml", text, 'utf8');
      divOpen[1].titre = true;
      divOpen.reset(2);
    } else if (patternChapitre.test(line)) {
      text += divOpen.closeTag(2);
      text += "<chapitre><nom>" + line + "</nom>";
      fs.appendFileSync("sources/legitext.xml", text, 'utf8');
      divOpen[2].chapitre = true;
      divOpen.reset(3);
    } else if (patternSection.test(line)) {
      text += divOpen.closeTag(3);
      text += "<section><nom>" + line + "</nom>";
      fs.appendFileSync("sources/legitext.xml", text, 'utf8');
      divOpen[3].section = true;
      divOpen.reset(4);
    } else if (patternSousSection.test(line)) {
      text += divOpen.closeTag(4);
      text += "<sous_section><nom>" + line + "</nom>";
      fs.appendFileSync("sources/legitext.xml", text, 'utf8');
      divOpen[4].sous_section = true;
      divOpen.reset(5);
    } else if (patternParagraphe.test(line)) {
      text += divOpen.closeTag(5);
      text += "<paragraphe><nom>" + line + "</nom>";
      fs.appendFileSync("sources/legitext.xml", text, 'utf8');
      divOpen[5].paragraphe = true;
      divOpen.reset(6);
    } else if (patternArticle.test(line)) {
      if (divOpen[6].article) {
        text += '</article>';
      }
      text += "<article><ref>" + line + "</ref>";
      fs.appendFileSync("sources/legitext.xml", text, 'utf8');
      divOpen[6].article = true;
    } else if (divOpen[6].article && line.replace(/ */, "").length !== 0) {
      text += "<texte>" + line + "</texte>";
      fs.appendFileSync("sources/legitext.xml", text, 'utf8');
      divOpen[6].article = true;
    }
  });

  stream.on('end', function(line) {
    var text ='';
    text += divOpen.closeTag(0);
    fs.appendFileSync("sources/legitext.xml", text, 'utf8');
    fs.appendFileSync("sources/legitext.xml", "</root>", 'utf8');
    var file    = fs.readFileSync("sources/legitext.xml", "utf8");
    var json    = parser.toJson(file);
    console.log(json);
    console.log('stream start');
    fs.appendFile('sources/legifrance.json', json, function (err) {
      if (err) throw err;
      console.log('It\'s saved!');
    });
  });

  


};
