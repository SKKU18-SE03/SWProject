/* jshint indent: 2 */
//Restauran_menu model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Restaurant_menu', {
    RN: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Restaurant',
        key: 'RN'
      }
    },
    Menu_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Price: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'Restaurant_menu'
  });
};
