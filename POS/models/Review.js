/* jshint indent: 2 */
//Review model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Review', {
    RVN: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Contents: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Rating: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'Review'
  });
};
