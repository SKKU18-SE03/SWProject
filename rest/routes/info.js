const express = require('express');
const router = express.Router();
const models = require('../models');

//기본 정보출력 페이지
router.get('/:id', (req, res) => {
    //레스토랑 정보 확인
    models.Restaurant.findOne({
        where:{RN:req.params.id}
    }).then(rest => {
        models.Restaurant_menu.findAll({
            where:{RN:req.params.id}
        }).then(menu =>{
            //즐겨찾기 여부 확인
            models.User_Favorite.findOne({
                where:{ 
                    SN:req.session.user.SN,
                    Favorite:req.params.id
                }
            }).then(fav =>{
                //총 평점 확인
                let rating = 0;
                models.Rating.findAll({
                    where:{RN:req.params.id}
                }).then(tmp =>{
                    let list = new Array();
                    for(let i = 0;i<tmp.length;i++){
                        list[i] = tmp[i].RVN;
                    }
                    models.Review.sum('Rating',{
                        where:{ RVN:list }
                    }).then(sum => {
                        models.Review.count({
                            where:{ RVN:list }
                        }).then(count => { 
                res.render('../rest/views/info',{rest:rest,menus:menu,rating:sum/count,fav:fav,user:req.session.user}); })
                    })
                })
            });
        });
    });
});

//추천 여부 변경
router.post('/:id', (req, res) => {
    models.Restaurant.findOne({
        where:{RN:req.params.id}
    }).then(rest => {
        models.Restaurant_menu.findAll({
            where:{RN:req.params.id}
        }).then(menu =>{
            //현재 user의 favorite가 존재하면 삭제 및 없으면 생성
            models.User_Favorite.findOne({
                where:{ 
                    SN:req.session.user.SN,
                    Favorite:req.params.id
                }
            }).then(tmp => {
                if(tmp){
                    models.User_Favorite.destroy({
                        where:{
                            SN:req.session.user.SN,
                            Favorite:req.params.id
                        }
                    }).then(() => {res.redirect('/info/'+req.params.id);})
                }
                else{
                    models.User_Favorite.create({
                        SN:req.session.user.SN,
                        Favorite:req.params.id
                    }).then(() => {res.redirect('/info/'+req.params.id);});
                }
            });
        });
    });
});

//레스토랑의 평점 추가
router.post('/:id/rating', (req,res) =>{
    //레스토랑의 rating 확인
    models.Rating.findOne({
        where:{
            SN:req.session.user.SN,
            RN:req.params.id
        }
    }).then(tmp => {
        //생성되어있는 경우
        if(tmp){
            models.Review.update({
                Contents:"asdf",
                Rating:req.body.rate,
                Date:new Date()
            },{
                where:{
                    RVN:tmp.RVN
                }
            }).then(() => {res.redirect('/info/'+req.params.id);})
        }
        //아닌 경우
        else{
            models.Review.create({
                Contents:"asdf",
                Rating:req.body.rate,
                Date:new Date()
            }).then(a =>{
                models.Rating.create({
                    SN:req.session.user.SN,
                    RN:req.params.id,
                    RVN:a.RVN
                })
            }).then(() => {res.redirect('/info/'+req.params.id);})
        }
    })
})

module.exports = router;
