//가격과 양을 곱해서 return 하는 기능
function countTotal(price,quantity){
    return price*quantity;
}
//string에 KRW를 넣어 return 하는 기능
function krwString(number){
    reverse = number.toString().split('').reverse();
    arr= [];
    for(var i = 0; i<reverse.length;i++){
        if((i+1) % 3 === 0 && (i+1) !== reverse.length){
            arr.push(reverse[i]);
            arr.push('.');
        }else{
            arr.push(reverse[i]);
        }
    }

    return 'KRW '+arr.reverse().join('');
}

//POS 이미지를 찾는데 도움을 주는 기능(POS에서는 사용되지 않음)
function parseLoc_POS(loc){
    return loc[i].Img_url = "../../../POS/public/images"+loc.split('/')[3]+'/'+loc.split('/')[4];
}

module.exports = {
    countTotal: countTotal,
    krwString: krwString,
    parseLoc_POS:parseLoc_POS
}
