/* jshint indent: 2 */
//Orders model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Orders', {
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
      primaryKey: true
    },
    TN: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    Orders_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Pay_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Visitors: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'Orders'
  });
};
