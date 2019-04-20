const express = require("express");
const bodyParser = require("body-parser");
const DBConnect = require("./dbconnect");
var User=require('./models/Usermodel');
const app = express();
const port = process.env.PORT || 1234;
const path=require('path')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'));
app.get('/',function(req,res,next){
res.sendFile(path.join(__dirname,'/public/index.html'));

});
app.get('/menu',function(req,res,next){
    res.sendFile(path.join(__dirname,'/views/build/200.html'));
    
    });
    
app.post('/login',function(req,res,next){

    res.sendFile(path.join(__dirname,'/public/afterlogin.html'));

})
app.set('view engine', 'pug');
app.post('/signup',function(req,res,next){
   console.log(req.body)
    var user = new User();
    user.name=req.body.name;
    user.email=req.body.email;
    user.password=req.body.password;
    user.save();
    res.render('thankyou.pug');

})
function remoteAddr(req) {
    if (req.ip) {
        return req.ip;
    }
    var socket = req.socket;
    if (socket.socket) {
        return socket.socket.remoteAddress;
    }
    return socket.remoteAddress;
}; 

app.get('/example', function(req, res){
    var ip = remoteAddr(req);
    res.render('ip', { ip: ip, ipFirstDigit:ip.charAt(0) });
});

app.get('/admin',function(req,res,next){
    res.sendFile(path.join(__dirname,'/public/admin.html'));
    
    });

app.listen(port,function(){
    console.log(`Server connected at ${port}`);
});