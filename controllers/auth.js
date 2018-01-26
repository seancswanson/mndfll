var express = require('express');
var bcrypt = require('bcrypt');
var passport = require('../config/passportConfig');
var db = require('../models');
var router = express.Router();

router.get('/login', function(req, res){
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/journal/all',
  successFlash: 'Login Successful!',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid Credentials'
}));

router.get('/signup', function(req, res){
  res.render('auth/signup');
});

router.post('/signup', function(req, res, next){
  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password
    }
  }).spread(function(user, wasCreated){
    if(wasCreated){
      //Good job, you didn't try to make a duplicate!
      passport.authenticate('local', {
        successRedirect: '/journal/all',
        successFlash: 'Successfully logged in!'
      })(req, res, next);
    }
    else {
      //Bad job, you tried to sign up when you should login
      req.flash('error', 'Email already exists.');
      res.redirect('/auth/login');
    }
  }).catch(function(err){
    req.flash('error', err.message);
    res.redirect('/auth/signup');
  });
});

router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'Successfully logged out');
  res.redirect('/');
});

module.exports = router;