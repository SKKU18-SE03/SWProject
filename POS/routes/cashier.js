const express = require('express');
const router = express.Router();
const models = require('../models');
const checkLogin = require('../helpers/checkLogin');
const sequelize = require('sequelize');
const op = sequelize.Op;
// /cashier main을 불렀을때
router.get('/',checkLogin, (req, res)=>{
    //RN과 맞는 Restaurant_menu를 찾는다.
    models.Restaurant_menu.findAll({
        where:{ RN:req.session.user.RN }
    }).then(menu =>{
        //RN과 맞는 Order를 찾고 시간 순 sort를 한다.
        models.Orders.findAll({
            where:{ RN:req.session.user.RN },
            order:[['Orders_time','DESC']]
        }).then(order =>{
            //order number를 얻은 다
            let list = new Array();
            for(let i = 0;i<order.length;i++){
                list[i] = order[i].OdN;
            }
            //order_menu에서 restaurant number와 order number가 맞는 data를 찾는다.
            models.Order_Menu.findAll({
                where:{
                    RN:req.session.user.RN,
                    OdN:list
                }
            }).then(oM => {
                //cashier.ejs에 넘겨준다.
                res.render('../POS/views/cashier/cashier.ejs',
                    {order:order, orderMenu:oM, menu:menu, user:req.session.user}
                );
            })
        })
    })
})
// /cashier/active를 불렀을때
router.get('/active',checkLogin, (req, res)=>{
   // RN 이 맞는 Restaurant menu를 불러온다. 
    models.Restaurant_menu.findAll({
        where:{ RN:req.session.user.RN }
    }).then(menu =>{
        // RN이 맞고 주문이 안끝난 order를 시간순으로 정렬한다.
        models.Orders.findAll({
            where:{
                RN:req.session.user.RN,
                Pay_time:null
            },
            order:[['Orders_time','DESC']]
        }).then(order =>{
            //order number를 얻은 다음
            let list = new Array();
            for(let i = 0;i<order.length;i++){
                list[i] = order[i].OdN;
            }
            //RN과 order number가 일치하는 order menu를 찾아서
            models.Order_Menu.findAll({
                where:{
                    RN:req.session.user.RN,
                    OdN:list
                }
            }).then(oM => {
                //cashier.ejs로 넘긴다.
                res.render('../POS/views/cashier/cashier.ejs',
                    {order:order, orderMenu:oM, menu:menu, user:req.session.user}
                );
            })
        })
    })
})


// /cashier/histroy를 불렀을때
router.get('/history',checkLogin, (req, res)=>{
    //RN 이 맞는 Restaurant menu를 부른 다음
    models.Restaurant_menu.findAll({
        where:{ RN:req.session.user.RN }
    }).then(menu =>{
        //결제가 되고 RN이 맞는 order를 불러온다.
        models.Orders.findAll({
            where:{
                RN:req.session.user.RN,
                Pay_time:{[op.ne]:null}
            },
            order:[['Orders_time','DESC']]
        }).then(order =>{
            //order number를 얻은 다음
            let list = new Array();
            for(let i = 0;i<order.length;i++){
                list[i] = order[i].OdN;
            }
            //RN과 order number가 일치하는 order menu를 찾아서
            models.Order_Menu.findAll({
                where:{
                    RN:req.session.user.RN,
                    OdN:list
                }
            }).then(oM => {
                // cashier.ejs에 보내준다.
                res.render('../POS/views/cashier/cashier.ejs',
                    {order:order, orderMenu:oM, menu:menu, user:req.session.user}
                );
            })
        })
    })
})


// /cashier/(order_number)/receipt를 불렀을때
router.get('/:id/receipt', (req, res)=>{
    //Restaurant menu를 찾고
    models.Restaurant_menu.findAll({
        where:{ RN:req.session.user.RN }
    }).then(menu =>{
        //order에 대한 주문을 찾고
        models.Order_Menu.findAll({
            where:{
                RN:req.session.user.RN,
                OdN:req.params.id
            }
        }).then(oM => {
            // receipt.ejs를 불러온다.
            res.render('../POS/views/cashier/receipt.ejs',
                {orderMenu:oM, menu:menu, user:req.session.user}
            );
        })
    })
})

// /cashier/(order_number)/pay를 불렀을때
router.get('/:id/pay', (req, res) =>{
    //결재 완료시간 입력
    models.Orders.update({
        Pay_time: new Date()
    },{
        where:{
            RN:req.session.user.RN,
            OdN:req.params.id
        }
    }).then(() => {
        //Restaurant에 있는 값들 변화를 위해서 Restaurant 찾기
        models.Restaurant.findOne({
            where:{ RN:req.session.user.RN }
        }).then(rest => {
            //현재 order 찾기
            models.Orders.findOne({
                where:{
                    RN:req.session.user.RN,
                    OdN:req.params.id
                }
            }).then(order => {
                //현재 table 찾기
                models.Table_info.findOne({
                    where:{
                        RN:req.session.user.RN,
                        TN:order.TN
                    }
                }).then(table => {
                    //Restaurant에서 변해야하는 값들 입력
                    let total = rest.Total_mealtime.getTime()
                        + order.Pay_time.getTime() - order.Orders_time.getTime();
                    rest.Rest_table += 1;
                    rest.Rest_seats += table.Entire_seat;
                    rest.seat_Rate = (rest.Entire_table - rest.Rest_table) / rest.Entire_table * 100;
                    rest.Table_rotation_rate = rest.Total_mealtime / rest.Total_order;
                    //Restaurant 변경
                    models.Restaurant.update({
                        Total_order:rest.Total_order,
                        Rest_table:rest.Rest_table,
                        Rest_seats:rest.Rest_seats,
                        Total_mealtime:total,
                        seat_Rate:rest.seat_Rate,
                        Table_rotation_rate:rest.Table_rotation_rate
                    },{
                        where:{ RN:req.session.user.RN }
                    }).then(() => {
                        //Daily_order 변경을 위해서 찾기
                        models.Daily_order.findOne({
                            where:{
                                RN:req.session.user.RN,
                                Date:new Date()
                            }
                        }).then(visitor => {
                            //Daily_order 값 변경
                            let m_visitor = visitor.Morning_visitor;
                            let l_visitor = visitor.Lunch_visitor;
                            let d_visitor = visitor.Dinner_visitor;
                            let tmp = new Date();
                            if(tmp.getHours()>=6 && tmp.getHours() <= 10) m_visitor += order.Visitors;
                            else if(tmp.getHours()>=11 && tmp.getHours() <= 16) l_visitor += order.Visitors;
                            else if(tmp.getHours()>=17 && tmp.getHours() <= 20) d_visitor += order.Visitors;
                            //Daily_order 변경 적용
                            models.Daily_order.upsert({
                                RN:req.session.user.RN,
                                Date:tmp,
                                Morning_visitor:m_visitor,
                                Lunch_visitor:l_visitor,
                                Dinner_visitor:d_visitor,
                                Daily_visitor:order.Visitors+visitor.Daily_visitor
                            },{
                                where:{
                                    RN:req.session.user.RN,
                                    Date:tmp,
                                }
                            }).then(()=>{res.redirect('/cashier');}) // /cashier redirect
                        })
                    })
                })
            })
        })
    })
})


module.exports = router;
