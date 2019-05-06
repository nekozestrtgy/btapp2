var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  if (req.session.user_id < 5) {
    res.render('users', { room: 'first' });
  } else {
    res.render('users', { room: 'second' });
  }
});

module.exports = router;
