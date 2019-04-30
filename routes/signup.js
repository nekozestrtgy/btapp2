var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/', function(req, res, next) {
  return User.create({
    user_name: req.body.user_name,
    password: req.body.password
  }).then(newUser => {
    console.log(newUser);
    res.redirect('../');
  })
});

module.exports = router;
