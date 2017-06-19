const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/UserModel');

module.exports = (passport) => {
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, (email, password, done) => {
    User.findOne({ email }).then((user) => {
      if (!user) return done(null, false, { message: 'wrong username' });
      if (user.password !== password) return done(null, false, { message: 'wrong ' });
      return done(null, user);
    }, err => done(err));
  }));

  passport.use('local-register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, (email, password, done) => {
    User.create({ email, password }).then((user) => {
      if (!user) return done(null, false, { message: 'user already exists' });
      return done(null, user);
    }, err => done(err));
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    }, err => done(err));
  });
};
