var models = require('../models');

module.exports.log = function(req, res, next) {
  models.exec.create({
    code: req.body.code,
    state: 'pending'
  }).then((createdCode) => {
    res.redirect(302, "/" + createdCode.id);
  });
};

module.exports.detail = function(req, res, next) {
  models.exec.findById(req.params.id).then((code) => {
    res.json({ code: code });
  });
};
