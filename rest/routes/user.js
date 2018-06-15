const express = require('express');
const router = express.Router();
const models = require('../models');
const saltRounds = 10;
const bcrypt = require('bcrypt');
const fs = require('fs');
const mkdirp = require('mkdirp');
const multer = require('multer');

// 사진 업로드를 위한 multer storage
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
//유저 정보 확인
router.get('/', (req, res) => {
    models.User.findOne({
        where:{SN:req.session.user.SN}
    }).then(user => {
        res.render('../rest/views/user',{user:user});
    });
});


//user의 정보 변경
router.post('/',upload.single('pic'), (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        let user = {
            ID:req.body.id,
            PW:hash,
            Nickname:req.body.nickname,
            Img_url:"../img/no_img.png",
            E_Mail:req.body.email
        };
        if(req.file) user.Img_url = req.file.path;
        models.User.update(user,{
            where:{ SN:req.session.user.SN }
        }).then(()=>{
            let newSession = {
                SN:req.session.user.SN,
                Nickname:user.Nickname,
                Img_url:user.Img_url,
                Password:user.PW
            }
            req.session.user = newSession;
            res.redirect('/main')
        });
    });
});

module.exports = router;
