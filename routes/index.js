var express = require('express');
var path = require('path');
var router = express.Router();
var controllers = require('../controllers');

/* GET home page. */
router.get('/', controllers.api_user_controller.index);

module.exports = router;
