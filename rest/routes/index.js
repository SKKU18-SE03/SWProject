const express = require('express');
const router = express.Router();
const models = require('../models');
const saltRounds = 10;
const bcrypt = require('bcrypt');
const fs = require('fs');
const mkdirp = require('mkdirp');
const multer = require('multer');

//사진 upload를 위한 multer storage
var upload = multer({
    storage:multer.diskStorage({
        destination:function(req, file, cb){
            mkdirp('rest/public/user/'+req.body.id,0755);
            cb(null,'rest/public/user/'+req.body.id);
        },
        filename:function(req, file, cb){
            cb(null,"image."+file.mimetype.split('/')[1]);
        }
    })
});

//메인 페이지
router.get('/', (req, res) => {
    res.render('../rest/views/start');
});
//login 페이지
router.get('/login',(req, res)=>{
    res.render('../rest/views/login');
});


//로그인 전송
router.post('/login',(req, res)=>{
    //유저 존재 여부 확인
    models.User.findOne({
        where:{
            ID:req.body.id
        }
    }).then((user) => {
        if(user){
            //password 확인
            bcrypt.compare(req.body.password, user.PW, function(err, result) {
                if(result){
                    req.session.user = {
                        SN:user.SN,
                        Nickname:user.Nickname,
                        Img_url:user.Img_url,
                        Password:user.Password
                    }
                    res.redirect('/main');
                }
                else{
                    let err = new Error('Password incorrect');
                    res.redirect(`/login?err=${err.message}`)
                }
            });
        }
        else{
            let err = new Error('유저 이름이 존재하지 않아요!')
            res.redirect(`/login?err=${err.message}`);
        }
    })
});

//signup 페이지
router.get('/signup',(req,res)=>{
    res.render('../rest/views/signup');
});

//signup 전송
router.post('/signup',upload.single('pic'),(req,res)=>{
    //user 존재 여부 확인
    models.User.findAll({
        where:{
            ID:req.body.id
        }
    }).then(user => {
        if(user.length > 0){
            let err = new Error("이미 사용자가 존재합니다!");
            res.redirect(`/signup?err=${err.message}`);
        }
        else{
            //유저 정보 입력
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                let newUser = {
                    ID:req.body.id,
                    PW:hash,
                    Nickname:req.body.nickname,
                    Img_url:"POS/rest/public/img/no_img.png",
                    E_Mail:req.body.email
                };
                if(req.file) newUser.Img_url = req.file.path;
                models.User.create(newUser).then(tmp=> {
                    let newSession = {
                        SN:tmp.SN,
                        Nickname:tmp.Nickname,
                        Img_url:tmp.Img_url,
                        Password:tmp.PW
                    };
		    req.session.user = newSession;
                    res.redirect('/main');
                });
            });
        }
    })
});

module.exports = router;
