const { string } = require("@hapi/joi");
const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    state:{
        type: String,
        required: true,
    },
    client:{
        type: mongoose.Schema.Types.ObjectId,
    },
    food:{
        type: [mongoose.Schema.Types.ObjectId],
        required: true
    },
    mix:{
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
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
        default: Date.now
    },

})

module.exports = mongoose.model('orders', OrderSchema)