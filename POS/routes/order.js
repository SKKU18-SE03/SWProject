const express = require('express');
const router = express.Router();
const models = require('../models');
const sequelize = require('sequelize');
const op = sequelize.Op;
const checkLogin = require('../helpers/checkLogin');

// /order 메인 페이지
router.get('/',checkLogin, (req, res) => {
    //현재 주문되어진 order와 Table 정보를 보내준다.
    models.Orders.findAll({
        where:{
            RN:req.session.user.RN,
            Pay_time:null
        }
    }).then(orders => {
        models.Table_info.count({
            where:{ RN:req.session.user.RN }
        }).then(table => {
            res.render('../POS/views/order/order',{table:table,orders:orders,user:req.session.user});
        });
    })
});

// order 정보 페이지 넘어가기
router.post('/',checkLogin, (req, res) => {
    //현재 테이블에 order 정보가 있는지 확인하고 보내준다.
    let table_number = req.body.table_number;
    models.Orders.findOne({
        where:{
            RN:req.session.user.RN,
            TN:table_number,
            Pay_time:null
        }
    }).then(order => {
        if(order) res.redirect(`/order/${order.OdN}/table/${table_number}/ord`);
        else {
            models.Orders.max('OdN', {
                where:{
                    RN:req.session.user.RN
                }
            }).then(a => {
                let tmp = 0;
                if(a) tmp = a;
                res.redirect(`/order/${tmp + 1}/table/${table_number}/ord`);
            })
        }
    })
});

//현재 태이블의 order 정보
router.get('/:id/table/:no_table/ord',checkLogin, (req, res) => {
    //menu를 찾고
    models.Restaurant_menu.findAll({
        where:{ RN: req.session.user.RN }
    }).then(menu => {
        //order 정보가 있는지 확인  
        models.Orders.findOne({
            where:{
                RN:req.session.user.RN,
                OdN:req.params.id,
                TN:req.params.no_table,
                Pay_time:null
            }
        }).then(order => {
            //현재 order에 메뉴 정보가 있는지 확인
            models.Order_Menu.findAll({
                where:{
                    RN:req.session.user.RN,
                    OdN:req.params.id
                }
            }).then(orderMenu => {
                //table 정보 확인
                models.Table_info.findOne({
                    where:{
                        RN:req.session.user.RN,
                        TN:req.params.no_table
                    }
                }).then(table => {
                    //order-list 렌더링
                    res.render('../POS/views/order/order-list',{
                        order:order,menu:menu,orderMenu:orderMenu,OdN:req.params.id,table:table
                    });
                })
            })
        })
    })
});

//현재 order 정보를 저장
router.post('/:id/table/:no_table/ord',checkLogin, (req, res) => {
    models.Order_Menu.findOne({
        where:{
            RN:req.session.user.RN,
            OdN:req.params.id,
            Menu_ID:req.body.MenuId
        }
    }).then(tmp => {
        //order 정보 업데이트
        models.Order_Menu.upsert({
            RN:req.session.user.RN,
            OdN:req.params.id,
            Menu_ID:req.body.MenuId,
            Menu_count:req.body.quantity
        },{
            where:{
                RN:req.session.user.RN,
                OdN:req.params.id,
                Menu_ID:req.body.MenuId
            }
        }).then(() => {
            res.redirect(`/order/${req.params.id}/table/${req.params.no_table}/ord`)
        }).catch(err => {
            res.redirect(`/order/${req.params.id}/table/${req.params.no_table}/ord?err=${err.message}`)
        })
    })
});

//order 정보 삭제
router.get('/:id/table/:no_table/ord/delete/:id_menu',checkLogin, (req,res) => {
    models.Order_Menu.destroy({
        where:{
            RN:req.session.user.RN,
            OdN:req.params.id,
            Menu_ID:req.params.id_menu
        }
    }).then(() => {
        res.redirect(`/order/${req.params.id}/table/${req.params.no_table}/ord`)
    })
});


//주문 완료
router.post('/:id/table/:no_table/ord/done',checkLogin, (req,res) => {
    models.Table_info.findOne({
        where:{
            RN:req.session.user.RN,
            TN:req.params.no_table
        }
    }).then(table =>{
        //테이블에 인원수보다 많은 경우 무시
        if(table.Entire_seat < req.body.visitor){
            let err = new Error('Too many Visitors!!');
            res.redirect(`/order/${req.params.id}/table/${req.params.no_table}/ord?err=${err.message}`)
        }
        //아닌 경우
        else {
            //orders 정보 입력
            models.Orders.upsert({
                RN:req.session.user.RN,
                OdN:req.params.id,
                TN:req.params.no_table,
                Orders_time:new Date(),
                Visitors:req.body.visitor
            },{
                where:{
                    RN:req.session.user.RN,
                    OdN:req.params.id,
                    TN:req.params.no_table
                }
            }).then(() => {
                //레스토랑의 정보 갱신
                models.Restaurant.findOne({
                    where:{ RN:req.session.user.RN }
                }).then(rest => {
                    rest.Total_order++;
                    rest.Rest_table -= 1;
                    rest.Rest_seats -= table.Entire_seat;
                    rest.seat_Rate = (rest.Entire_table - rest.Rest_table) / rest.Entire_table * 100;
                    models.Restaurant.update({
                        Total_order:rest.Total_order,
                        Rest_table:rest.Rest_table,
                        Rest_seats:rest.Rest_seats,
                        seat_Rate:rest.seat_Rate
                    },{
                        where:{ RN:req.session.user.RN }
                    }).then(() => {
                        res.redirect('/order');
                    })
                });
            })
        }
    })
})


module.exports = router;
