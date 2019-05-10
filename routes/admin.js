var express=require('express')
const router=express.Router();
var mongoose=require('mongoose')
var ItemSchema=require('../models/Item')
var Item=mongoose.model('items',ItemSchema)


router.get('/',(req,res,next)=>{
    res.render('./admin/main')
})
router.post('/',function(req,res,next){

    

});


module.exports=router;