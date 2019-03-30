var models = require('../models');

// get user data
module.exports.get = async function(req, res, next, passport) {
  if(passport.session && passport.session.id) {
    const user = await models.users.findByPk(passport.session.id);
    res.json({user: user, error: ""});
  }
  else {
    res.json({error: 'Please Login.'});
  }
};

// show user details
module.exports.show = function(req, res, next) {
  models.users.findByPk(req.params.id).then(user => {
    res.json({ user: user });
  });
};

// create user
module.exports.create = function(req, res, next) {
  var properties = ["name", "twitter", "class", "note", "created_at"];
  var new_values = {
    class: "normal",
  };
  properties.forEach(prop => {
    new_values[prop] = req.body[prop];
  });
  console.log(models.users);
  models.users.create(
    new_values
  ).then(new_user => {
    res.redirect(302, '/users');
  });
};

// update user
module.exports.update = function(req, res, next) {
  console.log('exports.update is executed');
  models.users.findByPk(req.params.id).then(user => {
    var properties = ["name", "twitter", "class", "note", "created_at"];
    var update_values = {};
    properties.forEach(prop => {
      update_values[prop] = req.body[prop];
    });
    user.update(update_values);
    res.redirect(302, '/users/' + user.id);
  });
};

// destroy user
module.exports.destroy = function(req, res, next) {
  models.users.destroy({
    where: { id: req.params.id }
  }).then(user => {
    res.redirect(302, '/users');
  });
};
