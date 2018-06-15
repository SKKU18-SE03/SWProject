/* jshint indent: 2 */
//Order_Menu model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Order_Menu', {
    RN: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Restaurant',
        key: 'RN'
      }
    },
    OdN: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
    },
    Menu_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
    },
    Menu_count: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'Order_Menu'
  });
};
