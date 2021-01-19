const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    state:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required:false,
    },
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    ordered:{
        type:Object,
        food:[mongoose.Schema.Types.ObjectId],
        mix:[mongoose.Schema.Types.ObjectId],
    },
    
    address:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now()
    },

})

module.exports = mongoose.model('orders', OrderSchema)