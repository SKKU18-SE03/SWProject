/* jshint indent: 2 */
//Article model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Article', {
    AN: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Contents: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    Recommandation: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    SN: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'User',
        key: 'SN'
      }
    }
  }, {
    tableName: 'Article'
  });
};
