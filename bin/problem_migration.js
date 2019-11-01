const fs = require('fs');
const models = require('../models');

fs.readdir('./problems', (err, files) => {
  if (err) throw err;
  files.forEach(async (file) => {
    const problem_dir = 'problems/' + file;
    console.log("check:", problem_dir + '/README.md');
    if (fs.statSync(problem_dir).isDirectory() && fs.statSync(problem_dir + '/README.md').isFile()) {
      let problem = await models.problems.findAll({
        where: {
          title: file
        }
      });
      const new_val = {
        title: file,
        base_path: problem_dir,
      };

      if (problem.length === 0) {
        problem = await models.problems.create(new_val);
        console.log("new challenge was created:", file);
      }
      else if (problem.length === 1){
        problem = await problem[0].update(new_val);
        console.log(file, "is updated");
      }
    }
  });
});
