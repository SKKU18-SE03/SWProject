const express = require('express');
const router = express.Router();
const models = require('../models');
const saltRounds = 10;
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('../rest/views/user',{user:req.session.user});
});

router.post('/', (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        let user = {
            ID:req.body.id,
            PW:hash,
            Nickname:req.body.nickname,
            E_Mail:req.body.email
        };
        models.User.update(user,{
            where:{ SN:req.session.user.SN }
        }).then(()=>{
            let newSession = {
                SN:user.SN,
                Nickname:user.Nickname,
                PW:user.PW
            }
            res.redirect('/main')
        });
    });
});

module.exports = router;
