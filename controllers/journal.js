var express = require('express');
// var moment = require('moment');
var momentTimezone = require('moment-timezone');
var _ = require('underscore');
var isLoggedIn = require('../middleware/isLoggedIn');
var router = express.Router();
var request = require('request');
var db = require("../models");

router.use(require('express-jquery')('/jquery.js'));

router.get('/all', isLoggedIn, function(req,res) {
  db.post.findAll({
    where: {userId: req.user.id},
    include: [db.user], 
    order: [['createdAt', 'DESC']]
  }).then(function(posts){
 var quoteURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
    request(quoteURL, function(error, response, body) {
      try {
        var quoteObj = JSON.parse(body);
        if (quoteObj.quoteAuthor === 'Donald Trump'){
          quoteObj.quoteAuthor = 'The Orange Man';
          var quoteOfTheDay = '"' + quoteObj.quoteText + '"' + " -" + quoteObj.quoteAuthor;
        } else if (quoteObj.quoteAuthor === '') {
          quoteObj.quoteAuthor = 'unknown'
          var quoteOfTheDay = '"' + quoteObj.quoteText + '"' + " -" + quoteObj.quoteAuthor;          
        } else {
          var quoteOfTheDay = '"' + quoteObj.quoteText + '"' + " -" + quoteObj.quoteAuthor;
         } 
          res.render('journal/all', {
          posts:posts,
          quoteOfTheDay: quoteOfTheDay
        });
      }
      catch (err){
        res.render('journal/all', {
          posts:posts,
          quoteOfTheDay: '"Victory comes from finding opportunity in problems" - Sun Tzu'
        });
      }
    });
  });
});

router.post('/all', isLoggedIn, function(req,res) {
  db.post.create({
    location: req.body.location,
    mood: req.body.mood,
    goal: req.body.goal,
    priority1: req.body.priority1,
    priority2: req.body.priority2,
    priority3: req.body.priority3,
    notes: req.body.notes,
    userId: req.user.id
  }).then(function(){
    res.redirect('/journal/all');
  }).catch(function(err) {
    console.log('Catch reached, err was ', err);
    res.status(500).send('Uh oh! :(');
  }); 
});

router.get('/new', isLoggedIn, function(req,res) {
    var quoteURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
    request(quoteURL, function(error, response, body) {
      try {
        var quoteObj = JSON.parse(body);
        var quoteOfTheDay = '"' + quoteObj.quoteText + '"' + " -" + quoteObj.quoteAuthor;
        res.render('journal/new', {quoteOfTheDay: quoteOfTheDay});
      }
      catch (err){
        res.render('journal/new', {
          quoteOfTheDay: '"Victory comes from finding opportunity in problems" - Sun Tzu'
        });
      }
    });
});

router.get('/view/:id', isLoggedIn, function(req,res) {
  db.post.findOne({
    where: {id: req.params.id},
    include: [db.user]
  }).then(function(post){
    var quoteURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
    request(quoteURL, function(error, response, body) {
      try {
        var quoteObj = JSON.parse(body);
        var quoteOfTheDay = '"' + quoteObj.quoteText + '"' + " -" + quoteObj.quoteAuthor;
        res.render('journal/single', {
          post:post,
          quoteOfTheDay: quoteOfTheDay
        });
      }
      catch (err){
        res.render('journal/single', {
          post:post,
          quoteOfTheDay: '"Victory comes from finding opportunity in problems" - Sun Tzu'
        });
      }
    });
  }).catch(function(err) {
    res.status(500).send('Uh oh! :(');
  }); 
});

router.delete('/view/:id', isLoggedIn, function(req,res){
  db.post.destroy({
    where: { id: req.params.id }
  }).then(function(deleted){
    res.send('success');
  }).catch(function(err){
    res.send('fail');
  })
});

router.get('/edit/:id', isLoggedIn, function(req,res) {
  db.post.findOne({
    where: {id: req.params.id},
    include: [db.user]
  }).then(function(post){
var quoteURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
    request(quoteURL, function(error, response, body) {
      try {
        var quoteObj = JSON.parse(body);
        var quoteOfTheDay = '"' + quoteObj.quoteText + '"' + " -" + quoteObj.quoteAuthor;
        res.render('journal/edit', {
          post:post,
          quoteOfTheDay: quoteOfTheDay
        });
      }
      catch (err){
        res.render('journal/edit', {
          post:post,
          quoteOfTheDay: '"Victory comes from finding opportunity in problems" - Sun Tzu'
        });
      }
    }).catch(function(err) {
      console.log('Catch reached, err was ', err);
      res.status(500).send('Uh oh! :(');
    }); 
  });
}); 

router.put('/view/:id',function(req,res) {
  db.post.update({
    location: req.body.location,
    mood: req.body.mood,
    goal: req.body.goal,
    priority1: req.body.priority1,
    priority2: req.body.priority2,
    priority3: req.body.priority3,
    notes: req.body.notes
    },
    {
    where: {id: req.params.id}
  }).then(function(){
    res.send('success');
  })

});

router.delete('/view/:id', function(req,res) {
  res.send('Delete successfull');
})

module.exports = router;
