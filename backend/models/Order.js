const { string } = require("@hapi/joi");
const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    state:{ // PROCESSING, READY, TRANSPORT, DELIVERED, CANCELED
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
        food:[Object],
        mix:[Object],
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
    message:{
        type:String,
        default:""
    },
    rated:{
        type:Boolean,
        default:false,
    }

})

module.exports = mongoose.model('orders', OrderSchema)