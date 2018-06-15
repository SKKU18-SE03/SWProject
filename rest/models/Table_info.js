/* jshint indent: 2 */
//Table_info model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Table_info', {
    RN: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Restaurant',
        key: 'RN'
      }
    },
    TN: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Entire_seat: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'Table_info'
  });
};
