var models = require('../models');

module.exports.langs = function(req, res, next) {
  models.lang.all().then((ret) => {
    console.log(ret)
    return res.json({ ret: ret });
  });
};

module.exports.set = async function(req, res, next) {
  const lang = await models.lang.findOne({
    where: {
      name: req.body.lang,
    }
  });

  console.log(lang);

  models.exec.create({
    lang: lang.id,
    code: req.body.code,
    stdin: req.body.stdin,
    state: 'pending'
  }).then((createdCode) => {
    res.redirect(302, "/" + createdCode.id);
  });
};

module.exports.detail = function(req, res, next) {
  models.exec.findById(req.params.id).then((code) => {
    models.lang.findById(code.lang).then((lang) => {
      res.json({
        code: code,
        lang: lang.name,
      });
    });
  });
};
