const express = require('express');
const router = express.Router();
const models = require('../models');
const checkLogin = require('../helpers/checkLogin');
const sequelize = require('sequelize');
const op = sequelize.Op;

// /menu
router.get('/',checkLogin, (req, res) =>{
    //restaurant의 메뉴룰 찾아서 보내준다
    models.Restaurant_menu.findAll({
        where:{
            RN:req.session.user.RN
        }
    }).then(food =>{
            res.render('../POS/views/menu/menu.ejs', {data:food,user:req.session.user})
    })
})

router.post('/search',checkLogin, (req, res) =>{
    // 메뉴에서 이름이 비슷한것을 찾아서 알려준다.
    models.Restaurant_menu.findAll({
        where:{
            RN:req.session.user.RN,
            name:{[op.like]:'%'+req.body.search+'%'}
        }
    }).then(food =>{
            res.render('../POS/views/menu/menu.ejs', {data:food,user:req.session.user})
    })
})

router.get('/add',checkLogin, (req, res) =>{
    //add-menu.ejs를 렌더링한다.
    let err = req.query;
    res.render(`../POS/views/menu/add-menu.ejs`,{err:err, user:req.session.user});
})

router.post('/add', (req, res) =>{
    //Menu_ID의 최대값을 찾은 뒤 그 다음번호로 menu를 만든다.
    models.Restaurant_menu.max('Menu_ID').then(tmp => {
        if(!tmp) tmp = 0;
        models.Restaurant_menu.create({
            RN: req.session.user.RN,
            Menu_ID:tmp+1,
            Name:req.body.name,
            Price: req.body.price,
            createdAt: new Date(),
            updatedAt: new Date()
        }).then(function(){
            res.redirect('/menus')
        }).catch(err => {
            res.redirect(`/menus/add?err=${err.message}`);
        })
    })
});

router.get('/edit/:id',checkLogin, (req, res) =>{
    //edit할 메뉴를 찾아서 보내준다.
    let err = req.query;
    models.Restaurant_menu.findOne({
        where: { RN:req.session.user.RN, Menu_ID:req.params.id }
    }).then(dataMenu => {
            res.render('../POS/views/menu/edit-menu.ejs', {data:dataMenu,err:err, user:req.session.user})
    })
});

router.post('/edit/:id',checkLogin, (req, res)=>{
    //edit 될 메뉴를 찾은 뒤 update를 실시한다.
    models.Restaurant_menu.update({
        Name:req.body.name,
        Price: req.body.price,
        updatedAt: new Date()
    }, { 
        where: {
            RN: req.session.user.RN,
            Menu_ID: req.params.id
        }
    }).then(dataMenu =>{
        res.redirect('/menus');
    }).catch(err => {
        res.redirect(`/menus/edit/${req.params.id}?err=${err.message}`);
    })
});

router.get('/delete/:id',checkLogin, (req, res)=>{
    //삭제할 메뉴를 알려준 후 delete한다.
    models.Restaurant_menu.destroy({
        where: { RN: req.session.user.RN, Menu_ID: req.params.id }
    }).then(dataMenu =>{
        res.redirect('/menus');
    });
});

module.exports = router;
