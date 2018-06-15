/* jshint indent: 2 */
//Prime_User model(사용되지 않음)
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Prime_User', {
    SN: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'SN'
      }
    },
    Name: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    Address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Phone_number: {
      type: DataTypes.STRING(11),
      allowNull: true
    }
  }, {
    tableName: 'Prime_User'
  });
};
