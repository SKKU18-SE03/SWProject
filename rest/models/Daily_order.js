/* jshint indent: 2 */
//Daily_order model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Daily_order', {
    RN: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Restaurant',
        key: 'RN'
      }
    },
    Date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true
    },
    Morning_visitor: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Lunch_visitor: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Dinner_visitor: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Daily_visitor: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'Daily_order'
  });
};
