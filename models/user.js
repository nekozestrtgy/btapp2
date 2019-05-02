'use strict';

var bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    user_name: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
      underscored: true,
    }
  );
  user.beforeCreate((user) => {
    return bcrypt.hash(user.password, 8)
      .then((hashedPassword) => {
        user.password = hashedPassword
      });
  });
  return user;
};
