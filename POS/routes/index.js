const express = require('express');
const router = express.Router();
const models = require('../models');
const checkLogin = require('../helpers/checkLogin');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const moment = require('moment');
const fs = require('fs');
const mkdirp = require('mkdirp');
const multer = require('multer');
//사진 upload를 위한 multer storage
var upload = multer({
    storage:multer.diskStorage({
        destination:function(req, file, cb){
            mkdirp('POS/public/images/'+req.body.Name,0755);
            cb(null,'POS/public/images/'+req.body.Name);
        },
        filename:function(req, file, cb){
            cb(null,"image."+file.mimetype.split('/')[1]);
        }
    })
});
//메인 페이지 연결
router.get('/', (req, res) => {
    console.log(req.session)
    //session이 존재할 시
    if(req.session.user){
        res.redirect('/home');
    }
    //아닐 시
    else{
        res.render('../POS/views/index');
    }
});
// /singup페이지 연결
router.get('/signup', (req,res) => {
    let err = req.query;
    
    res.render('../POS/views/signup',{err:err});
});

// /signup에서 보낼 시
router.post('/signup', upload.single('pic'),(req,res) => {
    //레스토랑이 존재할 시 이미 등록한 유저라고 보낸다.
    models.Restaurant.findAll({
        where:{
            Name:req.body.Name
        }
    }).then(rests => {
        if(rests.length > 0){
            let err = new Error("User already registered! Login another name");
            res.redirect(`/signup?err=${err.message}`);
        }
        else{
            //아닌 경우
            bcrypt.hash(req.body.Password, saltRounds, function(err, hash) {
                //새로운 유저 생성
                let open = new Date('1970-1-1 '+req.body.Open_time+':00');
                let close = new Date('1970-1-1 '+req.body.Close_time+":00");
                let newUser = {
                    Name:req.body.Name,
                    Password:hash,
                    Phone_number:req.body.Phone_num,
                    Open_time:open,
                    Close_time:close,
                    Add_date:new Date(),
                    Entire_table:req.body.Table_num,
                    Rest_table:req.body.Table_num,
                    Img_url:req.file.path,
                    Total_order:0,
                    Waiting_people:0,
                    Total_mealtime:0
                };
                models.Restaurant.create(newUser).then(tmp=> {
                    //새로운 session생성
                    let newSession = {
                        RN:tmp.RN,
                        Name:tmp.Name,
                        Password:tmp.Password
                    };
		    req.session.user = newSession;
                    // /signup2로 연결
                    res.redirect('/signup2');
                });
            });
        }
    })
})

// /signup2를 열었을 시
router.get('/signup2', (req,res) => {
    // Restaurant를 찾아서 넘겨준다.
    models.Restaurant.findOne({
        where:{ RN:req.session.user.RN }
    }).then(data => {
        res.render('../POS/views/signup2',{data:data});
    })
})

// /signup2에서 보낼 시
router.post('/signup2', (req,res) => {
    let i = 1;
    let total = 0;
    //각 Table_info 설정
    for(let a in req.body){
        models.Table_info.create({
            RN:req.session.user.RN,
            TN:i,
            Entire_seat:req.body[a]
        });
        total += parseInt(req.body[a]);
        i++;
    }
    //Restaurant update
    models.Restaurant.update({Entire_seats:total},{where:{RN:req.session.user.RN}})
    //Daily_order 생성
    models.Daily_order.upsert({
        RN:req.session.user.RN,
        Date:new Date(),
        Morning_visitor:0,
        Lunch_visitor:0,
        Dinner_visitor:0,
        Daily_visitor:0
    },{
        where:{
            RN:req.session.user.RN,
            Date:new Date(),
        }
    })
    // /home으로 redirect
    res.redirect('/home');
})

//login page
router.get('/login', (req,res) => {
    let err = req.query;
    res.render('../POS/views/login',{err:err});
})

//login page 전송
router.post('/login', (req,res) => {
    //user를 찾아보고 없으면 오류 출력
    models.Restaurant.findOne({
        where:{
            Name:req.body.Name
        }
    }).then((user) => {
        if(user){
            //있을 경우 비밀번호 비교
            bcrypt.compare(req.body.Password, user.Password, function(err, result) {
                if(result){
                    //맞으면 session 추가
                    req.session.user = {
                        RN:user.RN,
                        Name:user.Name,
                        Password:user.Password
                    }
                    //Daily_order 생성
                    models.Daily_order.upsert({
                        RN:req.session.user.RN,
                        Date:new Date(),
                        Morning_visitor:0,
                        Lunch_visitor:0,
                        Dinner_visitor:0,
                        Daily_visitor:0
                    },{
                        where:{
                            RN:req.session.user.RN,
                            Date:new Date(),
                        }
                    })
                    // /home 으로 redirect
                    res.redirect('/home');
                }
                else{
                    //error
                    let err = new Error('Password incorrect');
                    res.redirect(`/login?err=${err.message}`)
                }
            });
        }
        else{
            //error
            let err = new Error('Username not yet registered! Sign Up first!')
            res.redirect(`/login?err=${err.message}`);
        }
    })
})

//logout
router.get('/logout', (req,res) => {
    req.session.destroy(() => {
        console.log("User logged out");
        res.redirect('/');
    })
})

// /home
router.get('/home',checkLogin,(req,res) => {
    console.log(req.session)
    res.render('../POS/views/home',{user:req.session.user});
});







module.exports = router;
