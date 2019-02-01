var models = require('../models');

// show all user list
module.exports.index = function(req, res, next) {
  models.Users.all().then(users => {
    res.json({ users: users });
  });
};

// show user details
module.exports.show = function(req, res, next) {
  models.Users.findById(req.params.id).then(user => {
    res.json({ user: user });
  });
};

// create user
module.exports.create = function(req, res, next) {
  var properties = ["name", "twitter", "class", "note", "created_at"];
  var new_values = {};
  properties.forEach(prop => {
    new_values[props] = req.body[prop];
  });
  models.Users.create(
    new_values
  ).then(new_user => {
    res.redirect(302, '/users');
  });
};

// update user
module.exports.update = function(req, res, next) {
  console.log('exports.update is executed');
  models.Users.findById(req.params.id).then(user => {
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
  models.Users.destroy({
    where: { id: req.params.id }
  }).then(user => {
    res.redirect(302, '/users');
  });
};
