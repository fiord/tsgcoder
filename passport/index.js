const _ = require('lodash');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var models = require('../models');

const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;
const TWITTER_CALLBACK_URL = process.env.TWITTER_CALLBACK_URL;

// session configure
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(null, obj);
  })
});

passport.use(new TwitterStrategy({
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL: TWITTER_CALLBACK_URL,
  includeEmail: true,
  passReqToCallback: true,
}, async (req, token, tokenSecret, profile, done) => {
  passport.session.id = profile.id;
  if(req.user) {
    let user = await models.users.findOne({twitter: profile.id});
    if(user) {
      req.flash('errors', {
        msg: 'There is already a Twitter account that belongs to you. Sign in with that account or delete it, then link it with your current account.',
      });
      done();
      return;
    }

    user = await models.users.findById(req.user.id);
    user.twitter = profile.id;
    user.tokens.push({kind: 'twitter', accessToken, tokenSecret});
    user.profile.name = user.profile.name || profile.displayName;
    user.profile.location = user.profile.location || profile._json.location;
    user.rofile.picture = user.profile.picture || profile._json.profile_image_url_https;
    await user.save();

    req.flash('info', {msg: 'Twitter account has been linked'});
    done(null, user);
  }
  else {
    let user = await models.users.findOne({twitter: profile.id});
    if(user) {
      done(null, user);
      return;
    }

    const count = models.users.count({});
    user = new models.users();
    user.id = profile.id;
    user.name = profile.displayName;
    user.email = profile._json.email;
    user.twitter = profile.username;
    user.image = profile._json.profile_image_url_https;
    await user.save();
    done(null, user);
  }
}));

module.exports.passport = passport;

// middleware
module.exports.isAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()) {
    next();
    return;
  }
  res.redirect('/login');
};

module.exports.isAuthorized = (req, res, next) => {
  const provider = req.path.split('/').slice(-1)[0];
  if(_.find(req.user.tokens, {kind: provider})) {
    next();
    return;
  }
  res.redirect(`/auth/${provider}`);
};

