const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TechnicianSchema = new Schema({
    name: {
        type : String
    },
    email:{
        type : String
    },
    phonenumber:{
        type : String
    },
    address:{
        type : String
    },
    companyname:{
        type : String
    },
    password:{
        type : String
    }
});


module.exports = TechnicianSchema;
