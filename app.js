const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const promisify = require('es6-promisify');
const flash = require('connect-flash');
const i18n = require('i18n');
const expressValidator = require('express-validator');
const compression = require('compression');
const expressStaticGzip = require("express-static-gzip");
const routes = require('./routes/index');
const adminRoutes = require('./routes/admin');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');

require('./handlers/passport');

const app = express();

app.use(compression({
  level: 9,
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(expressValidator());
app.use(cookieParser());

i18n.configure({
  locales: ['ru', 'ua'],
  directory: __dirname + '/locales',
  defaultLocale: 'ru',
  cookie: 'i18n',
  objectNotation: true
});

app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }),
);

app.use(i18n.init);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  res.locals.__ = res.__ = function () {
    return i18n.__.apply(req, arguments);
  };
  next();
});

app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

app.use('/', routes, expressStaticGzip("/public/content/", {
  enableBrotli: true,
    customCompressions: [{
        encodingName: 'deflate',
        fileExtension: '.js'
    }],
}));
app.use('/admin', adminRoutes);

app.use(errorHandlers.notFound);

app.use(errorHandlers.flashValidationErrors);

if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors);

module.exports = app;
