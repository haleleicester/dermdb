var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('jethro');
var favicon = require('serve-favicon');
var routes = require('./routes/index');
var app = express();
var format = require('./middleware/auth/format.js');
var responder = require('./middleware/responder/index.js');
var errors = require('./middleware/errors/index.js');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); //Uncomment for favicon
app.use(logger.express);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/lib', express.static(path.join(__dirname, 'bower_components')));

app.use(function(req, res, next){
    res.locals.metrics = {
        startTime: process.hrtime()
    }; next();
});

app.use(format);
app.use('/', routes);
app.use(responder);
app.use(errors);

module.exports = app;
