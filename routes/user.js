var express=require('express')
const router=express.Router();
const mongoose=require('mongoose')
const UserSchema = require('../models/User');
const User=mongoose.model('saloonappuser',UserSchema)
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {ensureAuthenticated,forwardAuthenticated}=require('../config/auth');
const path=require('path');

router.use('/contact',ensureAuthenticated)
router.use('/account',ensureAuthenticated)
router.use('/menu',ensureAuthenticated)
router.use('/menu',express.static('public/build'))
router.get('/menu',(req,res,next)=>{
 

   

})


//after registration storing details in Database
router.post('/register',(req,res,next)=>
{
    const {name,companyname,email,phonenumber,password,address,agree} = req.body;
    let errors = [];


    if (!name || !email || !companyname ||!phonenumber||!password||!address) {
      errors.push({ msg: 'Please enter all fields' });
    }
    if(agree!='on')
    { 
        errors.push({ msg: 'Please agree the terms' });  

    }
    if (password.length < 6)
    {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }
    if (errors.length > 0) 
    {
        res.send({"errors":errors})
    }
    else 
    {
        User.findOne({ email: email }).then(user => {
            if (user) 
            {
             errors.push({ msg: 'Email already exists' });
             res.send({"errors":errors}) 
            }
            else
            {
              bcrypt.hash(password, saltRounds, function(err, hash)
              {
    
               const newUser = new User({
                     name,
                     email,
                     phonenumber,
                     address,
                     companyname
                    });
               newUser.password=hash;
               newUser.save()
                 .then(doc => {
                   console.log(doc)
                   res.render('thankyou')
                 })
                 .catch(err => {
                   console.error(err)
                 })
              
             });
  
           }

        });
 
    }
  
        
});


//User Account home page

router.post('/account',(req,res,next)=>{
  
  res.render('./user/main_user.ejs',{username:req.user.name})

});



// Contact page or feedbackpage

router.get('/contact',function(req,res,next){
  
  
    res.render('./contact/contact.ejs');

})

//Thankyou page 
router.post('/contact',function(req,res,next){
  
  
  res.render('./contact/thankyou.ejs');

})



//Booking and Item related Routes
router.get('/menu',function(req,res,next){

  
})
router.post('/checkout',function(req,res,next){
  console.log('nothing')
})
router.post('/bookingconfirmation',function(req,res,next){
console.log('Booking Confiration')
});


//User profile
router.use(ensureAuthenticated)
router.get('/profile',function(req,res,next){
   console.log(req.user)
   res.render('./user/profile.ejs',req.user)        

})

//user profile changes made and stored in db
router.post('/profile',function(req,res,next){
  const {name,companyname,email,phonenumber,password,address,agree} = req.body;
  let errors = [];


  if (!name || !email || !companyname ||!phonenumber||!password||!address) {
    errors.push({ msg: 'Please enter all fields' });
  }
  if (password.length < 6)
  {
      errors.push({ msg: 'Password must be at least 6 characters' });
  }
  if (errors.length > 0) 
  {
      res.send({"errors":errors})
  }
  else 
  {
      User.findOne({ email: email },
      function (err, doc){
        var keys=Object.keys(req.body);
        keys.map(key=>{
         if(doc[key]!=req.body[key])
         {
           if(key!='password')
           {
           doc[key]=req.body[key];
           }
         }

        });
        
        if(req.body.password!=doc.password)
        {

          bcrypt.hash(req.body.password, saltRounds, function(err, hash)
          {

          doc.password=hash;
          doc.save();
          res.json({"status":"successful"});
           
        })

     
 
        }

    doc.save();
    })
 
    
  }



})

router.use('/payment',ensureAuthenticated)
router.post('/payment',(req,res,next)=>{
  console.log(req.body)

  res.render('./user/BookingsandMenu/pay',req.body)


})

module.exports=router;


/*
  if (user) 
          {
           errors.push({ msg: 'Email already exists' });
           res.send({"errors":errors}) 
          }
          else
          {
            bcrypt.hash(password, saltRounds, function(err, hash)
            {
  
             const newUser = new User({
                   name,
                   email,
                   phonenumber,
                   address,
                   companyname
                  });
             newUser.password=hash;
             newUser.save()
               .then(doc => {
                 console.log(doc)
                 res.render('thankyou')
               })
               .catch(err => {
                 console.error(err)
               })
            
           });

         }

  */
 /*
 .then(user => {
      var keys=Object.keys(req.body);
      for(var i=0;i<keys.length;i++)
      {
        if(req.body[keys[i]]!=user[keys[i]])
        {
          if(keys[i]=='password')
          {
          }
          else
          {

            user[keys[i]]=req.body[keys[i]];
          }
        }
      }
      user.save().then((res)=>{
        res.json({"status":"saved changes"})
      }).catch(err=>{
        res.json(err);
      });

    

      });*/
