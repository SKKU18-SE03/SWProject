const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const port = process.env.PORT || 3000;
const extIP = require('external-ip')();

var vhost = require('vhost');

//각 router 당 사용해야하는 js 파일 연결
const posIndex = require('./POS/routes/index');
const posMenu = require('./POS/routes/menu');
const posOrders = require('./POS/routes/order');
const posCashier = require('./POS/routes/cashier');
//로그인 체크 기능 연결
const checkLogin = require('./POS/helpers/checkLogin');
//express 생성
const app1 = express();
//필요 기능 추가
app1.locals.helper = require('./POS/helpers/helpers.js');

app1.set('view engine', 'ejs');

app1.use(bodyParser.urlencoded({
    extended: false
}));

app1.use(session({
    secret: "pos",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app1.use(express.static('POS/public'));

// ROUTES 추가
app1.use('/', posIndex);
app1.use('/menus', posMenu);
app1.use('/order', posOrders);
app1.use('/cashier', posCashier);

app1.get("/", function(req, res){
    res.send("app1");
});
//rest에도 동일하게 적용
const restIndex = require('./rest/routes/index');
const restMain = require('./rest/routes/main');
const restUser = require('./rest/routes/user');
const restFavorite = require('./rest/routes/favorite');
const restInfo = require('./rest/routes/info');
const restSelect = require('./rest/routes/select');
const restLocation = require('./rest/routes/location');

const app2 = express();

app2.set('view engine', 'ejs');

app2.use(session({
    secret: "rest",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app2.use(bodyParser.urlencoded({
    extended: false
}));

app2.locals.helper = require('./rest/function/func.js');

app2.use(express.static('rest/public'));
app2.use('/POS',express.static('POS/public'));

app2.use('/',restIndex);
app2.use('/main',restMain);
app2.use('/user',restUser);
app2.use('/favorite',restFavorite);
app2.use('/info',restInfo);
app2.use('/select',restSelect);
app2.use('/location',restLocation);

app2.get("/", function(req, res){
    res.send("app2");
});

var app = express();
//서버 열기
extIP((err, ip) =>{
    app.use(vhost(ip, app1));
    console.log(ip);
});


extIP((err, ip) =>{
    app.use(vhost(ip, app2));
});

app1.listen(80);
app2.listen(3000);
