var express = require('express');
var router = express.Router();
var db = require("../models");


router.get('/all', function(req,res) {
  res.render('journal/all');
  // findAll from post model
});

router.post('/all', function(req,res) {
  res.redirect('journal/all');
  // create to post model
});

router.get('/new', function(req,res) {
  res.render('journal/new')
});

router.get('/view/:id', function(req,res) {
  res.render('journal/single')
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
