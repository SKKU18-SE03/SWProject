'use strict';

var Sequelize = require('sequelize');

//db migration하기 위한 code

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2018-06-08T13:21:10.131Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Restaurant",
            {
                "RN": {
                    "type": Sequelize.INTEGER(11),
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "Name": {
                    "type": Sequelize.STRING(255),
                    "allowNull": false
                },
                "Password": {
                    "type": Sequelize.STRING(255),
                    "allowNull": false
                },
                "Location_x": {
                    "type": Sequelize.DOUBLE,
                    "allowNull": true
                },
                "Location_y": {
                    "type": Sequelize.DOUBLE,
                    "allowNull": true
                },
                "Location_code": {
                    "type": Sequelize.INTEGER(11),
                    "allowNull": true
                },
                "Phone_number": {
                    "type": Sequelize.STRING(11),
                    "allowNull": true
                },
                "Add_date": {
                    "type": Sequelize.DATEONLY,
                    "allowNull": true
                },
                "Open_time": {
                    "type": Sequelize.DATE,
                    "allowNull": true
                },
                "Close_time": {
                    "type": Sequelize.DATE,
                    "allowNull": true
                },
                "Total_order": {
                    "type": Sequelize.INTEGER(11),
                    "allowNull": true
                },
                "Total_mealtime": {
                    "type": Sequelize.DATE,
                    "allowNull": true
                },
                "Entire_table": {
                    "type": Sequelize.INTEGER(11),
                    "allowNull": true
                },
                "Entire_seats": {
                    "type": Sequelize.INTEGER(11),
                    "allowNull": true
                },
                "Table_rotation_rate": {
                    "type": Sequelize.DATE,
                    "allowNull": true
                },
                "Waiting_people": {
                    "type": Sequelize.INTEGER(11),
                    "allowNull": true
                },
                "Rest_table": {
                    "type": Sequelize.INTEGER(11),
                    "allowNull": true
                },
                "Img_url": {
                    "type": Sequelize.STRING(255),
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Review",
            {
                "RVN": {
                    "type": Sequelize.INTEGER(11),
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "Contents": {
                    "type": Sequelize.STRING(255),
                    "allowNull": false
                },
                "Rating": {
                    "type": Sequelize.FLOAT,
                    "allowNull": true
                },
                "Date": {
                    "type": Sequelize.DATEONLY,
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "User",
            {
                "SN": {
                    "type": Sequelize.INTEGER(11),
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "ID": {
                    "type": Sequelize.STRING(12),
                    "allowNull": false
                },
                "PW": {
                    "type": Sequelize.STRING(255),
                    "allowNull": false
                },
                "Nickname": {
                    "type": Sequelize.STRING(12),
                    "allowNull": true
                },
                "E_Mail": {
                    "type": Sequelize.STRING(255),
                    "allowNull": false
                },
                "Location_x": {
                    "type": Sequelize.DOUBLE,
                    "allowNull": true
                },
                "Location_y": {
                    "type": Sequelize.DOUBLE,
                    "allowNull": true
                },
                "Location_code": {
                    "type": Sequelize.INTEGER(11),
                    "allowNull": true
                },
                "Img_url": {
                    "type": Sequelize.STRING(255),
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Order_Menu",
            {
                "RN": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "Restaurant",
                        "key": "RN"
                    },
                    "primaryKey": true,
                    "allowNull": false
                },
                "OdN": {
                    "type": Sequelize.INTEGER(11),
                    "primaryKey": true,
                    "allowNull": false
                },
                "Menu_ID": {
                    "type": Sequelize.INTEGER(11),
                    "primaryKey": true,
                    "allowNull": false
                },
                "Menu_count": {
                    "type": Sequelize.INTEGER(11),
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Orders",
            {
                "RN": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "Restaurant",
                        "key": "RN"
                    },
                    "primaryKey": true,
                    "allowNull": false
                },
                "OdN": {
                    "type": Sequelize.INTEGER(11),
                    "primaryKey": true,
                    "allowNull": false
                },
                "TN": {
                    "type": Sequelize.INTEGER(11),
                    "allowNull": false
                },
                "Orders_time": {
                    "type": Sequelize.DATE,
                    "allowNull": true
                },
                "Pay_time": {
                    "type": Sequelize.DATE,
                    "allowNull": true
                },
                "Visitors": {
                    "type": Sequelize.INTEGER(11),
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Prime_User",
            {
                "SN": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "User",
                        "key": "SN"
                    },
                    "primaryKey": true,
                    "allowNull": false
                },
                "Name": {
                    "type": Sequelize.STRING(8),
                    "allowNull": true
                },
                "Address": {
                    "type": Sequelize.STRING(255),
                    "allowNull": true
                },
                "Phone_number": {
                    "type": Sequelize.STRING(11),
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Rating",
            {
                "SN": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "User",
                        "key": "SN"
                    },
                    "primaryKey": true,
                    "allowNull": false
                },
                "RN": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "Restaurant",
                        "key": "RN"
                    },
                    "primaryKey": true,
                    "allowNull": false
                },
                "RVN": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "Review",
                        "key": "RVN"
                    },
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Article",
            {
                "AN": {
                    "type": Sequelize.INTEGER(11),
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "Contents": {
                    "type": Sequelize.STRING(1000),
                    "allowNull": false
                },
                "Recommandation": {
                    "type": Sequelize.INTEGER(11),
                    "allowNull": true
                },
                "Date": {
                    "type": Sequelize.DATEONLY,
                    "allowNull": true
                },
                "SN": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "User",
                        "key": "SN"
                    },
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Restaurant_menu",
            {
                "RN": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "Restaurant",
                        "key": "RN"
                    },
                    "primaryKey": true,
                    "allowNull": false
                },
                "Menu_ID": {
                    "type": Sequelize.INTEGER(11),
                    "primaryKey": true,
                    "allowNull": false
                },
                "Name": {
                    "type": Sequelize.STRING(255),
                    "allowNull": true
                },
                "Price": {
                    "type": Sequelize.INTEGER(11),
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Article_IMG_URL",
            {
                "AN": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "Article",
                        "key": "AN"
                    },
                    "primaryKey": true,
                    "allowNull": false
                },
                "Img_url": {
                    "type": Sequelize.STRING(255),
                    "primaryKey": true,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Review_IMG_URL",
            {
                "RVN": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "Review",
                        "key": "RVN"
                    },
                    "primaryKey": true,
                    "allowNull": false
                },
                "Img_url": {
                    "type": Sequelize.STRING(255),
                    "primaryKey": true,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Table_info",
            {
                "RN": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "Restaurant",
                        "key": "RN"
                    },
                    "primaryKey": true,
                    "allowNull": false
                },
                "TN": {
                    "type": Sequelize.INTEGER(11),
                    "primaryKey": true,
                    "allowNull": false
                },
                "Entire_seat": {
                    "type": Sequelize.INTEGER(11),
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Daily_order",
            {
                "RN": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "Restaurant",
                        "key": "RN"
                    },
                    "primaryKey": true,
                    "allowNull": false
                },
                "Date": {
                    "type": Sequelize.DATEONLY,
                    "primaryKey": true,
                    "allowNull": false
                },
                "Morning_visitor": {
                    "type": Sequelize.INTEGER(11),
                    "allowNull": true
                },
                "Lunch_visitor": {
                    "type": Sequelize.INTEGER(11),
                    "allowNull": true
                },
                "Dinner_visitor": {
                    "type": Sequelize.INTEGER(11),
                    "allowNull": true
                },
                "Daily_visitor": {
                    "type": Sequelize.INTEGER(11),
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "User_Favorite",
            {
                "SN": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "User",
                        "key": "SN"
                    },
                    "primaryKey": true,
                    "allowNull": false
                },
                "Favorite": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "Restaurant",
                        "key": "RN"
                    },
                    "primaryKey": true,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
