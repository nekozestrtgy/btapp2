var express = require('express');
var router = express.Router();
var models = require('../models');

//不正アクセス防止のmiddleware
var urlCheck = function (req, res, next) {
  if (req.session.url != '/') {
    var err = '不正なアクセスです。やり直してください。';
    res.render('index', { error: err });
  } else {
    next();
  }
}

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', urlCheck, function (req, res, next) {
  models.user.create({
    user_name: req.body.user_name,
    password: req.body.password
  }).then(() => {
    res.redirect('../login');
  })
});

module.exports = router;
