var express = require('express');
var router = express.Router();
var controllers = require('../controllers');

router.post('/test/', controllers.code_tester.log);

module.exports = router;
