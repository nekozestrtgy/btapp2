var express = require('express');
var router = express.Router();
var models = require('../models');
var bcrypt = require("bcrypt");

router.get('/', function (req, res, next) {
  res.render('login');
});

router.post('/', function (req, res, next) {
  var input_user_name = req.body.user_name || null;
  var input_password = req.body.password || null;

  if (!input_user_name || !input_password) {
    var err = 'ログインには全記入欄への入力が必要です。再入力してください。';
    res.render('login', { error: err });
    return;
  }

  models.user.findOne({
    where: {
      user_name: input_user_name,
    }
  })
    .then((user) => {
      if (user) {
        bcrypt.compare(input_password, user.password, function (err, result) {
          if (result == true) {
            req.session.user_id = user.id;
            res.redirect('/users');
          } else {
            var err = 'パスワードが違います。確認の上、再入力してください。';
            res.render('login', { error: err });
          }
        })
      }
      else {
        var err = '登録情報が見つからずログインできませんでした。確認の上、再入力してください。';
        res.render('login', { error: err });
      }
    })
});

module.exports = router;
