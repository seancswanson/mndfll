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
        console.log(quoteObj);
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
        console.log(quoteObj);
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
        console.log(quoteObj);
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
    console.log('Catch reached, err was ', err);
    res.status(500).send('Uh oh! :(');
  }); 
});

router.delete('/view/:id', isLoggedIn, function(req,res){
  console.log('Delete route. ID= ', req.params.id);
  db.post.destroy({
    where: { id: req.params.id }
  }).then(function(deleted){
    console.log('deleted = ', deleted);
    res.send('success');
  }).catch(function(err){
    console.log('An error happened', err);
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
        console.log(quoteObj);
        var quoteOfTheDay = '"' + quoteObj.quoteText + '"' + " -" + quoteObj.quoteAuthor;
        res.render('journal/all', {
          post:post,
          quoteOfTheDay: quoteOfTheDay
        });
      }
      catch (err){
        res.render('journal/all', {
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

// router.put('/view/:id',function(req,res) {
//   console.log('PUT route!');
//   console.log('ID = ', req.params.id);
//   console.log('req.body is ', req.body);
//   db.post.findOne({
//     where: {id: req.params.id},
//     include: [db.user],
//     defaults: {
//     location: req.body.location,
//     mood: req.body.mood,
//     goal: req.body.goal,
//     priority1: req.body.priority1,
//     priority2: req.body.priority2,
//     priority3: req.body.priority3,
//     notes: req.body.notes
//     }
//   }).spread(function(post, wasCreated){
//     if(wasCreated){
//       console.log(post);
//     } else {
//       location = req.body.location,
//       mood = req.body.mood,
//       goal = req.body.goal,
//       priority1 = req.body.priority1,
//       priority2 = req.body.priority2,
//       priority3 = req.body.priority3,
//       notes = req.body.notes
//       post.save().then(function(updatedPost){
//         console.log(updatedPost);
//       })
//     }
//   }).catch(err);
// });

router.put('/view/:id',function(req,res) {
  console.log('PUT route!');
  console.log('ID = ', req.params.id);
  console.log('req.body is ', req.body);
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
    where: {id: req.params.id},
    include: [db.user]
  }).then(function(){
    res.send('success');
  })

});

router.delete('/view/:id', function(req,res) {
  res.send('Delete successfull');
  // destroy where id = req.id
})

module.exports = router;
