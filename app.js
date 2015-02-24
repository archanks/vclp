var express          = require('express'),
    engine           = require('ejs-locals'),
    bodyParser       = require('body-parser'),
    expressValidator = require('express-validator'),
    http             = require('http'),
    path             = require('path'),
    _                = require('lodash'),

    global           = require('./copy/global.json'),
    about            = require('./copy/about.json'),
    people           = require('./copy/people.json'),
    reports          = require('./copy/reports.json'),
    media            = require('./copy/media.json'),
    newsletters      = require('./copy/newsletters.json'),
    events           = require('./copy/events.json'),
    careers          = require('./copy/careers.json'),

    app = express();

app.engine('ejs', engine);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('view options', {
  layout: false
});
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());

app.use(express.static('public'));

app.get('/', function(req, res) {

  var template = {
    global      : global,
    about       : about,
    people      : people,
    reports     : reports,
    media       : media,
    newsletters : newsletters,
    events      : events,
    careers     : careers
  };

  res.render('pages/index', template);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
