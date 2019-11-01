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
  if (passport.session && passport.session.id) {
    // register submission
    const user = await models.users.findByPk(passport.session.id);
    const problem = await models.problems.findByPk(req.body.problemId);
    const lang = await models.lang.findOne({
      where: {
        name: req.body.lang,
      }
    });
    const new_submission = {
      problem_id: problem.id,
      user_id: user.id,
      lang_id: lang.id,
      code: req.body.code,
      result: "WJ"
    };
    const submission = await models.submission.create(new_submission);
    // register testcase and exec
    const testcases = require("../" + problem.base_path + "/test/testcase.json");
    for(const testcase of testcases) { 
      const input_dat = fs.readFileSync(problem.base_path + "/test/" + testcase.in);
      const new_exec = {
        author_id: submission.user_id,
        lang_id: submission.lang_id,
        code: submission.code,
        stdin: input_dat,
        state: "pending"
      };
      const exec_model = await models.exec.create(new_exec);

      const new_testcase = {
        name: testcase.name,
        input_path: testcase.in,
        output_path: testcase.out,
        result: "WJ",
        submission_id: submission.id,
        exec_id: exec_model.id
      };
      const test_model = await models.testcases.create(new_testcase);

    }

    res.redirect(302, "/submissions/" + submission.id);
  }
  else {
    res.json({error: 'please login'});
  }
}

module.exports.submission = async function(req, res, next) {
  // testcase等のupdateも兼ねる
  const submission = await models.submission.findByPk(req.params.id);
  const tests = await models.testcases.findAll({
    where: {
      submission_id: submission.id
    }
  });
  const problem = await models.problems.findByPk(submission.problem_id);
  const user = await models.users.findByPk(submission.user_id);
  const lang = await models.lang.findByPk(submission.lang_id);
  let results = 'AC';
  const update_results = (val) => {
    results = (val === 'WJ' ? val : results);
    if (results === 'WJ') return;
    results = (val === 'IE' ? val : results);
    if (results === 'IE') return;
    results = (val === 'CE' ? val : results);
    if (results === 'CE') return;
    results = (val !== 'AC' ? val : results);
  };

  const format_output = (output) => {
    console.log("check", output);
    console.log(typeof(output));
    return output.trim().replace(/\r\n/, '\n');
  };
  let testcases = await Promise.all(tests.map(async (test) => {
    const update_test = {};
    if (test.result === 'WJ') {
      const exec = await models.exec.findByPk(test.exec_id);
      if (exec.state === 'finished') {
        if (exec.compile !== '') {
          // compile error
          update_test.result = 'CE';
          update_results('CE');
        }
        else {
          const correct_output = fs.readFileSync(problem.base_path + "/test/" + test.output_path).toString();
          console.log("correct_output", correct_output);
          if (format_output(exec.stdout) === format_output(correct_output)) {
            update_test.result = 'AC';
            update_results('AC');
          }
          else {
            update_test.result = 'WA';
            update_results('WA');
          }
        }
      }
      else {
        update_test.result = 'WJ';
        update_results('WJ');
      }
      await test.update(update_test);
    }
    else {
      update_test.result = test.result;
    }
    return {
      name: test.name,
      exec_id: test.exec_id,
      result: update_test.result
    };
  }));

  await submission.update({
    result: results
  });

  const ret = {
    submissionId: submission.id,
    problem: {
      id: problem.id,
      title: problem.title
    },
    user: {
      id: user.id,
      name: user.name
    },
    lang: lang.name,
    code: submission.code,
    result: results,
    testcases: testcases
  };
  console.log(ret);
  res.json(ret);
}
