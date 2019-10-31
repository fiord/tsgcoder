const fs = require("fs");
const testcases = require("./testcase.json");

const onRegister = async (models) => {
  testcases.map(async (testcase) => {
    if (testcase.in && testcase.out) {

    }
  });
};
module.exports.onRegister = onRegister;
