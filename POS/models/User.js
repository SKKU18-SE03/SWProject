/* jshint indent: 2 */
//User model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    SN: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ID: {
      type: DataTypes.STRING(12),
      allowNull: false
    },
    PW: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Nickname: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    E_Mail: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Location_x: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    Location_y: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    Location_code: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Img_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'User'
  });
};
