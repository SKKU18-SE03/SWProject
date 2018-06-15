/* jshint indent: 2 */
//User favotire model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User_Favorite', {
    SN: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'SN'
      }
    },
    Favorite: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Restaurant',
        key: 'RN'
      }
    }
  }, {
    tableName: 'User_Favorite'
  });
};
