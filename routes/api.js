var express = require('express');
var router = express.Router();
var controllers = require('../controllers');

// api of controlling users
router.get('/users/', controllers.api_user_controller.index);
router.get('/users/:id(\\d+)', controllers.api_user_controller.show);
router.post('/users/', controllers.api_user_controller.create);
router.put('/users/:id(\\d+)', controllers.api_user_controller.update);
router.delete('/users/:id(\\d+)', controllers.api_user_controller.destroy);
router.get('/code/:id(\\d+)', controllers.code_tester.detail);

module.exports = router;
