const express = require('express');
const router = express.Router();
const models = require('../models');

//location 정보 띄우기
router.get('/', (req, res) => {
    res.render('../rest/views/location',{user:req.session.user});
});


//user의 location 정보 저장
router.post('/',(req, res) =>{
    models.User.update({
        Location_x:req.body.Location_x,
        Location_y:req.body.Location_y
    },{
        where:{
            SN:req.session.user.SN
        }
    }).then(() => {res.redirect('/main')});
});

module.exports = router;
