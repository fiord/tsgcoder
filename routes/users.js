var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
module.exports.index = function(req, res, next) {
  models.Users.all().then(user => {
    res.render('users/index', {users: users});
  });
};

router.get('/', console.log("hoge"));
module.exports = router;
