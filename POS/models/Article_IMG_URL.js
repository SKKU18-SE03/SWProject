/* jshint indent: 2 */
//Articel_IMG_URL model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Article_IMG_URL', {
    AN: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Article',
        key: 'AN'
      }
    },
    Img_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'Article_IMG_URL'
  });
};
