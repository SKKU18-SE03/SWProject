/* jshint indent: 2 */
//Restaurant model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Restaurant', {
    RN: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Location_x: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    Location_y: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    Location_code: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Phone_number: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    Add_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Open_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Close_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Total_order: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Total_mealtime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Entire_table: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Entire_seats: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Table_rotation_rate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Waiting_people: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Rest_table: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Rest_seats: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    seat_Rate: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Img_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'Restaurant'
  });
};
