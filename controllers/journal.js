var express = require('express');
var moment = require('moment');
// var insertQuote = require('../middleware/insertQuote');
var isLoggedIn = require('../middleware/isLoggedIn');
var router = express.Router();
var request = require('request');
var db = require("../models");

router.use(require('express-jquery')('/jquery.js'));

router.get('/all', function(req,res) {
  db.post.findAll({
    include: [db.user], 
    order: '"createdAt" DESC'
  }).then(function(posts){
    // var quoteURL = 'https://quotes.rest/qod?category=inspire';
    // request(quoteURL, function(error, response, body) {
    //   console.log(body);
    //   var quoteOfTheDay = '"' + body.contents.quotes[0].quote + '"' + " -" + body.contents.quotes[0].author;
    // });
    res.render('journal/all', {
      posts:posts
    });
  });
});

    //     var quoteOfTheDay = '"' + body.contents.quotes[0].quote + '"' + " -" + body.contents.quotes[0].author;
    // });
    // res.render('journal/all', {
    //   posts:posts,
    //   quoteOftheDay:quote
    // });

router.post('/all', isLoggedIn, function(req,res) {
  db.post.create({
    location: req.body.location,
    mood: req.body.mood,
    goal: req.body.goal,
    priority1: req.body.priority1,
    priority2: req.body.priority2,
    priority3: req.body.priority3,
    notes: req.body.notes,
    userId: 1
  }).then(function(){
    res.redirect('/journal/all');
  }).catch(function(err) {
    console.log('Catch reached, err was ', err);
    res.status(500).send('Uh oh! :(');
  }); 
});

router.get('/new', isLoggedIn, function(req,res) {
  res.render('journal/new')
});

router.get('/view/:id', function(req,res) {
  db.post.findOne({
    where: {id: req.params.id},
    include: [db.user]
  }).then(function(post){
    res.render('journal/single', {post:post});
  }).catch(function(err) {
    console.log('Catch reached, err was ', err);
    res.status(500).send('Uh oh! :(');
  }); 
});

router.delete('/view/:id', function(req,res){
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

router.get('/edit/:id', function(req,res) {
  db.post.findOne({
    where: {id: req.params.id},
    include: [db.user]
  }).then(function(post){
    res.render('journal/edit', {post:post});
  }).catch(function(err) {
    console.log('Catch reached, err was ', err);
    res.status(500).send('Uh oh! :(');
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
