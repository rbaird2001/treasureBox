var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const cbUrl = process.env.NODE_ENV === "production"?"https://game-media-shelf.herokuapp.com":"http://localhost:3000"
console.log(cbUrl);
passport.serializeUser(function(user, done) {
 done(null, user);
});

passport.deserializeUser(function(user, done) {
 done(null, user);
});

passport.use(
 new GoogleStrategy(
  {
   clientID: process.env.GOOGLE_CLIENT_ID,
   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
   callbackURL: `${cbUrl}/auth/google/callback`
  },
  function(accessToken, refreshToken, profile, done) {
   var userData = {
    email: profile.emails[0].value,
    name: profile.displayName,
    token: accessToken
   };
   done(null, userData);
  }
 )
);