var express = require('express');
var moment = require('moment');
var router = express.Router();
var db = require("../models");


router.get('/all', function(req,res) {
  db.post.findAll({
    include: [db.user]
  }).then(function(posts){
    res.render('journal/all', {posts:posts});
  })
  // posts[0].dataValues.id
  // findAll from post model
});

router.post('/all', function(req,res) {
  db.post.create({
    location: req.body.location,
    mood: req.body.mood,
    goal: req.body.goal,
    priority1: req.body.priority1,
    priority2: req.body.priority2,
    priority3: req.body.priority3,
    notes: req.body.notes
  }).then(function(){
    res.redirect('journal/all');
  }).catch(function(err) {
    console.log('Catch reached, err was ', err);
    res.status(500).send('Uh oh! :(');
  }); 
  // create to post model
});

router.get('/new', function(req,res) {
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
  // res.render('journal/single')
  // Get this one post from id
});

router.get('/edit:/:id', function(req,res) {
  // res.render('journal/edit');
  res.send('Editing post view');
  // edit form for post from id
});

router.put('/view/:id',function(req,res) {
  res.send('PUT route!');
  // Sends edited form to update
});

router.delete('/view/:id', function(req,res) {
  res.send('Delete successfull');
  // destroy where id = req.id
})

module.exports = router;
