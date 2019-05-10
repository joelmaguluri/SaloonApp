var express=require('express')
const router=express.Router();
var session = require("express-session")
var passport=require('../config/passport')
var mongoose=require('mongoose')
var ItemSchema=require('../models/Item')
var Item=mongoose.model('saloonitems',ItemSchema)
var item=require('../Items/item');

//Home page
router.get('/',(req,res,next)=>{
    req.logout();
    res.render('main')
})

router.use('/getitems',function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


//after user login route
router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
           res.json(err)
          
        } else if (info) {
          res.json(info)
        } else {
            req.login(user, function(err) {
                if (err) {
                    console.log(err)
                     res.redirect('/')
                } else {
                  res.redirect(307,'/user/account')
                  
                }
            })
        }
    })(req, res, next);
  });


//logout
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
  

/*
 
  GETITEMS is an Api route which gives items preset in database 

*/
router.get('/getitems',function(req,res){
  res.json(item);

  /*
  Item.find({}).then(items=>{
    console.log(items)
    res.json(items)
  }).catch(err=>{
    console.log(err);
    res.json(err)
  })
  */
  })


router.post('/checkout',(req,res,next)=>{
  var keys=Object.keys(req.body);
  var obj={};
  keys.map(catogery=>
    {
      
     obj[catogery]=[]
     req.body[catogery].map(item=>{
  
      if(item.length==3)
      {
        obj[catogery].push({name:item[0],price:item[1]})
      }
     })

   })
  keys.map(catogery=>{
  if(obj[catogery].length==0)
  {
    delete obj[catogery];
  }

  })

  res.render('./user/BookingsandMenu/checkouttable.ejs',obj)

})


module.exports=router;
