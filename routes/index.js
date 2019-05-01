var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function (req, res, next) {
  models.user.create({
    user_name: req.body.user_name,
    password: req.body.password
  }).then(() => {
    res.redirect('../login');
  })
});

module.exports = router;
