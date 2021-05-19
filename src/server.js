'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('./auth/models/users');


const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');

const v1Routes = require('./api/routes/v1.js');
const v2Routes = require('./api/routes/v2.js');
const authRoutes = require('./auth/routes.js');


const app = express();

app.use(express.json());

app.use(logger);


app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Login with Facebook
passport.use(new FacebookStrategy({
  clientID: process.env.CLIENT_ID || '959008094901801',
  clientSecret: process.env.CLIENT_SECRET || 'bcfd937b302cfda6cb0bc6bc208995ab',
  callbackURL: 'http://localhost:3000/auth/facebook/secrets',
},
async function(accessToken, refreshToken, profile, cb) {
  await User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    return cb(err, user);
  });
},
));

app.get('/', (req, res) => {
  res.status(200).send('You are at home!!!!');
});

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/secrets',
  passport.authenticate('facebook', { failureRedirect: '/signin' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);
// Routes
app.use(authRoutes);

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
