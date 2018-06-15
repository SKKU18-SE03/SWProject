//image file 위치 얻기
function parseLoc_user(loc){
    return "../../user/"+loc.split('/')[3]+'/'+loc.split('/')[4];
}

function parseLoc_POS(loc){
    return "../../POS/images/"+loc.split('/')[3]+'/'+loc.split('/')[4];
}


module.exports = {
    parseLoc_user:parseLoc_user,
    parseLoc_POS:parseLoc_POS
}
