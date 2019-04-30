var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login');
}); // /loginをgetした時に、login.pugをrenderする(このファイルでは、/ = /login）。

router.post('/', function(req, res, next) {
  if (req.body.user_name) { //req.body.user_nameの有無で条件分岐
    req.session.user = {name: req.body.user_name}; //req.body.user_nameをキーnameでreq.session.userに保存
    res.redirect('../');
  } else {
    var err = '入力内容が正しくありません。確認して再入力してください。';
    res.render('login', {error: err});
  }
});

module.exports = router;
