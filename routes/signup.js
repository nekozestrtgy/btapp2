var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/', function(req, res, next) {
  models.user.create({
    user_name: req.body.user_name,
    password: req.body.password
  }).then((crearedUser) => {
    console.log(crearedUser);
    res.redirect('../');
  })
});

module.exports = router;
