const mongoose = require("mongoose");
const connection = mongoose.connect("mongodb://sudeepjoel:chinnu745@ds249311.mlab.com:49311/sudeepdb",{ useNewUrlParser: true },function(err){
    if(err){
        throw err;
    }
    else{
        console.log("Database Connected");
    }
})

