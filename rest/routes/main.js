const express = require('express');
const router = express.Router();
const models = require('../models');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('rest', 'restaurant', '1234',{ dialect: "mysql", port:3306});


//메인 페이지 출력
router.get('/', (req, res) => {
    //즐겨찾기 정보 출력
    models.User_Favorite.findAll({
        where:{ SN:req.session.user.SN }
    }).then(tmp => {
        let list = new Array();
        for(let i = 0;i<tmp.length;i++){
            list[i] = tmp[i].Favorite;
        }
        models.Restaurant.findAll({
            where:{ RN:list }, limit:4
        }).then(f_rest => {
            //시간별 추천 레스토랑 출력
            let time = new Date();
            time.setDate(time.getDate() - 1);
            if(time.getHours() < 6){
                time.setDate(time.getDate() - 1);
                sequelize.query("SELECT * FROM Restaurant INNER JOIN Daily_order ON Restaurant.RN=Daily_order.RN WHERE Daily_order.Date=\'"+time.toISOString().substring(0,10)+"\' ORDER BY Daily_visitor DESC LIMIT 4",
                {type:sequelize.QueryTypes.SELECT}).then(t_rest =>{
                    res.render('../rest/views/main',{fav:f_rest,tim:t_rest,user:req.session.user});
                });
            }
            else if(time.getHours() >= 6 && time.getHours() <= 10){
                sequelize.query("SELECT * FROM Restaurant INNER JOIN Daily_order ON Restaurant.RN=Daily_order.RN WHERE Daily_order.Date=\'"+time.toISOString().substring(0,10)+"\' ORDER BY Morning_visitor DESC LIMIT 4",
                {type:sequelize.QueryTypes.SELECT}).then(t_rest =>{
                    res.render('../rest/views/main',{fav:f_rest,tim:t_rest,user:req.session.user});
                });
            }
            else if(time.getHours() >= 11 && time.getHours() <= 16){
                sequelize.query("SELECT * FROM Restaurant INNER JOIN Daily_order ON Restaurant.RN=Daily_order.RN WHERE Daily_order.Date=\'"+time.toISOString().substring(0,10)+"\' ORDER BY Lunch_visitor DESC LIMIT 4",
                {type:sequelize.QueryTypes.SELECT}).then(t_rest =>{
                    res.render('../rest/views/main',{fav:f_rest,tim:t_rest,user:req.session.user});
                });
            }
            else if(time.getHours() >= 17 && time.getHours() <= 20){
                 sequelize.query("SELECT * FROM Restaurant INNER JOIN Daily_order ON Restaurant.RN=Daily_order.RN WHERE Daily_order.Date=\'"+time.toISOString().substring(0,10)+"\' ORDER BY Dinner_visitor DESC LIMIT 4",
                {type:sequelize.QueryTypes.SELECT}).then(t_rest =>{
                    res.render('../rest/views/main',{fav:f_rest,tim:t_rest,user:req.session.user});
                });
            }
            else{
                sequelize.query("SELECT * FROM Restaurant INNER JOIN Daily_order ON Restaurant.RN=Daily_order.RN WHERE Daily_order.Date=\'"+time.toISOString().substring(0,10)+"\' ORDER BY Daily_visitor DESC LIMIT 4",
                {type:sequelize.QueryTypes.SELECT}).then(t_rest =>{
                    res.render('../rest/views/main',{fav:f_rest,tim:t_rest,user:req.session.user});
                });
            }
        })
    });
});

module.exports = router;
