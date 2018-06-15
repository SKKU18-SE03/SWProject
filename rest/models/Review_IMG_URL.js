/* jshint indent: 2 */
//Review_IMG_URL model(사용되지 않음)
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Review_IMG_URL', {
    RVN: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Review',
        key: 'RVN'
      }
    },
    Img_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'Review_IMG_URL'
  });
};
