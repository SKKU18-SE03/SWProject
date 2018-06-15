const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = new Sequelize('rest', 'restaurant', '1234',{ dialect: "mysql", port:3306});
const op = Sequelize.Op;
const models = require('../models');

//기본적인 레스토랑 표시(전체 주문이 많은 순)
router.get('/', (req, res) => {
    models.Restaurant.findAll({
        order:[['Total_order','DESC']],
        limit:50
    }).then(rest =>{
        res.render('../rest/views/select',{rest:rest,id:null,user:req.session.user});
    });
});
//레스토랑 검색(이름으로 검색)
router.get('/search/:nm', (req, res) => {
    models.Restaurant.findAll({
        where:{Name:{[op.like]:"%"+req.params.nm+"%"}}
    }).then(rest =>{
        res.render('../rest/views/select',{rest:rest,id:null,user:req.session.user});
    });
});
//식당 sorting
router.get('/:id', (req,res) => {
    //만석률 순으로 정렬
    if(req.params.id == 'seatrate'){
        models.Restaurant.findAll({
            order:[['seat_Rate','DESC']],
            limit:50
        }).then(rest =>{
            res.render('../rest/views/select',{rest:rest,id:req.params.id,user:req.session.user});
        });
    }
    //빨리 먹을 수 있는 순으로 정렬(구현되지 않음)
    else if(req.params.id == 'fast'){
        models.Restaurant.findAll({
            order:[['Total_order','DESC']],
            limit:50
        }).then(rest =>{
            res.render('../rest/views/select',{rest:rest,id:req.params.id,user:req.session.user});
        });
    }
    //즐겨찾기 많은 순으로 정렬
    else if(req.params.id == 'favorite'){
        sequelize.query("SELECT Restaurant.RN, Restaurant.Name, Restaurant.Img_url, Restaurant.Rest_seats, Restaurant.Entire_seats, Favorite.Count FROM Restaurant LEFT JOIN (SELECT Favorite, COUNT(*) AS Count FROM User_Favorite GROUP BY Favorite) Favorite ON Restaurant.RN=Favorite.Favorite ORDER BY Favorite.Count DESC",
        {type:sequelize.QueryTypes.SELECT}).then(rest => {
            let list = new Array();
            for(let i = 0; i < rest.length; i++){
                list[i] = rest[i].Count;
            }
            res.render('../rest/views/select',{rest:rest,id:req.params.id,count:list,user:req.session.user});
        });
    }
    //평점이 높은 순으로 정렬
    else if(req.params.id == 'rating'){
        sequelize.query("SELECT Restaurant.RN, Restaurant.Name, Restaurant.Img_url, Restaurant.Rest_seats, Restaurant.Entire_seats, Average.Avg FROM Restaurant LEFT JOIN (SELECT RN, AVG(Rev.Rating) AS Avg from Rating INNER JOIN (SELECT RVN, Rating FROM Review) Rev ON Rating.RVN=Rev.RVN GROUP BY RN) Average ON Restaurant.RN=Average.RN ORDER BY Average.Avg DESC",
        {type:sequelize.QueryTypes.SELECT}).then(rest => {
            let list = new Array();
            for(let i = 0; i < rest.length; i++){
                list[i] = rest[i].Avg;
            }
            res.render('../rest/views/select',{rest:rest,id:req.params.id,avg:list,user:req.session.user});
        });
    }
});

module.exports = router;
