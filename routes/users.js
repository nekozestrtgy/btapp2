var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  var login_user_name = req.session.user_name
  var login_password = req.session.user_password
  res.render('users', { login_user_name: login_user_name, login_password: login_password });
});

module.exports = router;
