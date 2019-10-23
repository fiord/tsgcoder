const fs = require('fs');

const path = process.argv[2] + '/test/';
const execute = process.argv[3];

fs.readdir(path + 'in', (err, files) => {
  if (err) throw err;
  files.forEAch(async (file) => {
    console.log(file);
  });
});
