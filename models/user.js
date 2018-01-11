'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: function(pendingUser, options){
        if(pendingUser && pendingUser.password){
          var hash = bcrypt.hashSync(pendingUser.password, 10);
          pendingUser.password = hash;
        }
      }
    }
  // }, {
  //   classMethods: {
  //     associate: function(models) {
  //       // associations can be defined here
  //       models.user.hasMany(models.post);
  //     }
  //   }
  });
  user.associate = function(models) {
    models.user.hasMany(models.post, { through: models.userId });
  }; 
  
  user.prototype.isValidPassword = function(passwordTyped){
    return bcrypt.compareSync(passwordTyped, this.password);
  }

  user.prototype.toJSON = function(){
    var user = this.get();
    delete user.password;
    return user;
  }

  return user;
};