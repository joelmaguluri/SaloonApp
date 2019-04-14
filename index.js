const express = require("express");
const bodyParser = require("body-parser");
const DBConnect = require("./dbconnect");
var User=require('./models/Usermodel');
const app = express();
const port = process.env.PORT || 1234;
const path=require('path')
app.use(bodyParser.json());
app.use(express.static('public'));
app.get('/',function(req,res,next){
res.sendFile(path.join(__dirname,'/public/index.html'));

});
app.post('/',function(req,res,next){
    var user = new User();
    user.name=req.body.name;
    user.email=req.body.email;
    user.password=req.body.password;
    user.save();
    res.json({"status":"success"});

});
app.listen(port,function(){
    console.log(`Server connected at ${port}`);
});