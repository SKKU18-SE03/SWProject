const express = require('express');
const router = express.Router();
const models = require('../models');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('rest', 'restaurant', '1234',{ dialect: "mysql", port:3306});

//user의 즐겨찾기
router.get('/', (req, res) => {
    //user가 즐겨찾기 한 부분을 확인한후 레스토랑의 정보 보내기
    models.User_Favorite.findAll({
        where:{SN:req.session.user.SN}
    }).then(tmp =>{
        let list = new Array();
        for(let i = 0;i<tmp.length;i++){
            list[i] = tmp[i].Favorite;
        }
        models.Restaurant.findAll({
            where:{RN:list}
        }).then(rest =>{
            res.render('../rest/views/favorite',{rest:rest,user:req.session.user});
        });
    })
});

//시간별 추천 순 및 추천 페이지
router.get('/:tmp', (req, res) => {
    let a = req.params.tmp;
    //시간순 추천인 경우
    if(a === "time"){
        //어제의 시간으로 선정하고 각 시간에 맞는 추천 식당 선택
        let time = new Date();
            time.setDate(time.getDate() - 1);
            if(time.getHours() < 6){
                time.setDate(time.getDate() - 1);
                sequelize.query("SELECT * FROM Restaurant INNER JOIN Daily_order ON Restaurant.RN=Daily_order.RN WHERE Daily_order.Date=\'"+time.toISOString().substring(0,10)+"\' ORDER BY Daily_visitor DESC LIMIT 4",
                 {type:sequelize.QueryTypes.SELECT}).then(f_rest =>{
                    
                    res.render('../rest/views/recommand',{rest:f_rest,user:req.session.user,tmp:req.params.tmp});
                 });
            }
            else if(time.getHours() >= 6 && time.getHours() <= 10){
                sequelize.query("SELECT * FROM Restaurant INNER JOIN Daily_order ON Restaurant.RN=Daily_order.RN WHERE Daily_order.Date=\'"+time.toISOString().substring(0,10)+"\' ORDER BY Morning_visitor DESC LIMIT 4",
                 {type:sequelize.QueryTypes.SELECT}).then(f_rest =>{
                    
                    res.render('../rest/views/recommand',{rest:f_rest,user:req.session.user,tmp:req.params.tmp});
                 });
            }
            else if(time.getHours() >= 11 && time.getHours() <= 16){
                sequelize.query("SELECT * FROM Restaurant INNER JOIN Daily_order ON Restaurant.RN=Daily_order.RN WHERE Daily_order.Date=\'"+time.toISOString().substring(0,10)+"\' ORDER BY Lunch_visitor DESC LIMIT 4",
                 {type:sequelize.QueryTypes.SELECT}).then(f_rest =>{
                    
                    res.render('../rest/views/recommand',{rest:f_rest,user:req.session.user,tmp:req.params.tmp});
                 });
            }
            else if(time.getHours() >= 17 && time.getHours() <= 20){
                 sequelize.query("SELECT * FROM Restaurant INNER JOIN Daily_order ON Restaurant.RN=Daily_order.RN WHERE Daily_order.Date=\'"+time.toISOString().substring(0,10)+"\' ORDER BY Dinner_visitor DESC LIMIT 4",
                 {type:sequelize.QueryTypes.SELECT}).then(f_rest =>{
                    
                    res.render('../rest/views/recommand',{rest:f_rest,user:req.session.user,tmp:req.params.tmp});
                 });
            }
            else{
                sequelize.query("SELECT * FROM Restaurant INNER JOIN Daily_order ON Restaurant.RN=Daily_order.RN WHERE Daily_order.Date=\'"+time.toISOString().substring(0,10)+"\' ORDER BY Daily_visitor DESC LIMIT 4",
                 {type:sequelize.QueryTypes.SELECT}).then(f_rest =>{
                    
                    res.render('../rest/views/recommand',{rest:f_rest,user:req.session.user,tmp:req.params.tmp});
                 });
            }
    }
    // 고유 추천 순(구현 안되어있음)
    else{}
});

module.exports = router;
