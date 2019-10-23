var models = require('../models');

module.exports.langs = function(req, res, next) {
  models.lang.findAll().then((ret) => {
    return res.json({ ret: ret });
  });
};

module.exports.get = async function(req, res, next, passport) {
  if(passport.session && passport.session.id) {
    let codes = await models.exec.findAll({
      where: {
        author_id: passport.session.id
      }
    });
    for(let i = 0; i < codes.length; i++) {
      const lang_data = await models.lang.findByPk(codes[i].lang);
      codes[i].lang = lang_data.name;
    }
    res.json({codes: codes});
  }
  else {
    res.json({error: 'please login'});
  }
}

module.exports.set = async function(req, res, next, passport) {
  console.log(req.body);
  const lang = await models.lang.findOne({
    where: {
      name: req.body.lang,
    }
  });

  models.exec.create({
    author_id: (passport.session && passport.session.id ? passport.session.id : 0),
    lang: lang.id,
    code: req.body.code,
    stdin: req.body.stdin,
    state: 'pending'
  }).then((createdCode) => {
    res.redirect(302, "/" + createdCode.id);
  });
};

module.exports.detail = function(req, res, next) {
  models.exec.findByPk(req.params.id).then((code) => {
    models.lang.findByPk(code.lang).then((lang) => {
      res.json({
        code: code,
        lang: lang.name,
      });
    });
  });
};
