const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {
        type : String
    },
    catogery:{
        type : String
    },
    price:{
        type : String
    },
    description:{
        type : String
    }
});


module.exports = ItemSchema;
