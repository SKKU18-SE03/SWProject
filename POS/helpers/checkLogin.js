//로그인 체크 기능
function checkLogin(req,res,next){
    if(req.session.user){
        next();
    }
    else{
        res.redirect('/');
    }
}

module.exports = checkLogin;
