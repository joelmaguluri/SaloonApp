const express = require("express");
const bodyParser = require("body-parser");
const DBConnect = require("./dbconnect");
var TechnicianSchema=require('./models/Technicianmodel');
var CustomerSchema=require('./models/Customermodel');
const mongoose = require('mongoose');
var Services=require('./public/services');
const app = express();
const port = process.env.PORT || 1234;
const path=require('path')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.static(path.join(__dirname,'/public/Table')));

app.get('/',function(req,res,next){
res.sendFile(path.join(__dirname,'/public/index.html'));

});
// Need to convert them to template engines
app.get('/technician', function(req, res){
    res.sendFile(path.join(__dirname,'/public/Technician.html'));
});
app.get('/checkout', function(req, res){
    res.sendFile(path.join(__dirname,'/public/checkout.html'));
});
app.get('/bookingconfirmation', function(req, res){
    res.render('ip.pug');

});
app.set('view engine', 'pug');

// need to build the UI
app.post('/customerlogin',function(req,res,next){
    var Customer=mongoose.model("customer",CustomerSchema);
    var customer = new Customer(req.body);
    Customer.find({email: req.body.email},function(err,docs){
        if(docs.length==0){
            console.log('user not found');
   
        }
        else if(docs[0].email==req.body.email && docs[0].password==req.body.password){
            res.render('afterlogin.pug',docs[0]);
        }
        else{
            console.log('wrong password')
        }


})


});
// need to build the UI
app.post('/technicianlogin',function(req,res,next){
    var Technician=mongoose.model("Technician",TechnicianSchema)
    var technician = new Technician(req.body);
    Technician.find({email: req.body.email},function(err,docs){
        if(docs.length==0){
            console.log('user not found');
   
        }
        else if(docs[0].email==req.body.email && docs[0].password==req.body.password){
            res.render('technicianprofile',docs[0]);
        }
        else{
            console.log('wrong password')
        }


})

});

app.post('/payment',function(req,res,next){
   console.log(req.body);
   if(req.body.radgroup=='Online'){
    res.render('payment.pug',req.body);
   }

   else{

    res.json({payment:"Onservice"});
   }
});

app.post('/customersignup',function(req,res,next){
    var Customer=mongoose.model("customer",CustomerSchema);
    var customer = new Customer(req.body);
    Customer.find({email: req.body.email},function(err,docs){
     if(docs.length==0){
         console.log(docs);
         customer.save()
         res.render('thankyou.pug');

     }
     else{

        console.log('record already exists');
         res.render('dialogue.pug')
     }
    
    });


});

app.post('/techniciansignup',function(req,res,next){
    var Technician=mongoose.model("Technician",TechnicianSchema)
    var technician = new Technician(req.body);
    Technician.find({email: req.body.email},function(err,docs){
     if(docs.length==0){
         console.log(docs);
         technician.save()
         res.render('thankyou.pug');

     }
     else{

        console.log('record already exists');
         res.render('dialogue.pug')
     }
    
    });


});


app.get('/admin',function(req,res,next){
    res.sendFile(path.join(__dirname,'/public/admin.html'));

});


app.listen(port,function(){
    console.log(`Server connected at ${port}`);
});
