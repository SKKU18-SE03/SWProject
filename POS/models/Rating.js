/* jshint indent: 2 */
//Rating model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Rating', {
    SN: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'SN'
      }
    },
    RN: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Restaurant',
        key: 'RN'
      }
    },
    RVN: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Review',
        key: 'RVN'
      }
    }
  }, {
    tableName: 'Rating'
  });
};
