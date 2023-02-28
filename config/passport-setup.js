const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");
const User = require("../model/user-model.js");
const jwt = require("jsonwebtoken");
const jwtconfig = require("./jwt");

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) return done(null, false);
    return done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/redirected",
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      console.log(profile);
      // check if user exists
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        // if exists , log the user
        if (currentUser) {
          console.log("user already exists", currentUser);
          done(null, currentUser);
        }
        // if user not exist save user into database
        else {
          new User({
            username: profile.displayName,
            googleId: profile.id,
            acessToken: jwtconfig.createtoken(profile.displayName),
          })
            .save()
            .then((newuser) => {
              console.log("NewUser save to db:", newuser);
              done(null, newuser);
            });
        }
      });
    }
  )
);
