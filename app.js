'use strict';
var config = require('./app/config');
//var session = require('express-session');
var csrf = require('csurf');
var helpers = require('./app/helpers');
var crypto = require('crypto');
var packageInfo = require('./package.json');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./app/routes/index');
var port = process.env.PORT || 3000;

var app = express();


var assetHash = (crypto.createHash('md5').update(packageInfo.version + Date.now()).digest('hex')).substring(0, 10);

// view engine setup
var hbs = require('express-hbs');
var adminHbs = hbs.create();

// Load helpers
helpers.loadCoreHelpers(adminHbs, assetHash);

app.engine('hbs', hbs.express4({
   partialsDir: __dirname + '/views/partials'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//app.use(session({ secret: 'keyboard cat', key: 'sid', cookie: { secure: true }}));
//app.use(csrf());
//app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/// error handlers
// ------------------------------------------------------------------------------
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.set('port', port);

var server = app.listen(app.get('port'), function() {
   console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;