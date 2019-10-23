const fs = require('fs');
var models = require('../models');

// get problem list
module.exports.list = async function(req, res, next) {
  const problems = await models.problems.findAll();
  res.json({problems: problems});
}

// get problem detail
module.exports.detail = async function(req, res, next) {
  const problem = await models.problems.findByPk(req.params.id);
  const base_path = problem.base_path;
  const content = fs.readFileSync(base_path + '/README.md').toString();
  res.json({
    problem: {
      title: problem.title,
      main: content,
    }
  });
}

// register problem answer
module.exports.register = async function(req, res, next, passport) {
  console.log(req.body);
  if (passport.session && passport.session.id) {
    const user = models.users.findByPk(passport.session.id);
    const problem = models.problems.findByPk(req.body.problemId);
    const new_submission = {
      user: user,
      problem: problem,
      lang: req.body.lang,
      code: req.body.code,
    };
  }
}
