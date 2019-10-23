const models = require('../models');
const lang_list = require('./language.json');

lang_list.forEach(async (lang) => {
  const lang_record = await models.lang.findAll({
    where: {
      name: lang.name
    }
  });
  if (lang_record.length === 0) {
    await models.lang.create(lang);
    console.log("new language was registered:", lang.name);
  }
  else {
    await lang_record[0].update(lang);
    console.log("language was updated:", lang.name);
  }
});
