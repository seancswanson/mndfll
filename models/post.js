'use strict';
module.exports = (sequelize, DataTypes) => {
  var post = sequelize.define('post', {
    location: DataTypes.STRING,
    mood: DataTypes.STRING,
    goal: DataTypes.STRING,
    priority1: DataTypes.STRING,
    priority2: DataTypes.STRING,
    priority3: DataTypes.STRING,
    notes: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.post.belongsTo(models.user);
      }
    }
  });
  return post;
};