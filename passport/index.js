var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var models = require('../models');

const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;

// session configure
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new TwitterStrategy({
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL: "localhost:3000/auth/twitter/callback"
}, (token, tokenSecret, profile, done) => {
  passport.session.id = profile.id;
  profile.twitter_token = token;
  profile.twitter_token_secret = tokenSecret;
  
  process.nextTick(() => {
    return done(null, profile);
  });
  // models.users.findOrCreate(..., (err, user) => {
  //   if(err) return done(err);
  //   done(null, user);
  //});
}));

module.exports = {passport};
