var express = require('express');
var router = express.Router();
var controllers = require('../controllers');

router.post('/test/', controllers.code_tester.set);
router.get('/code/:id(\\d+)', controllers.code_tester.detail);
router.get('/langs/', controllers.code_tester.langs);

module.exports = router;
