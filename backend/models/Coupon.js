const mongoose = require("mongoose");

const CouponSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    percent:{
        type: Number,
        required: true,
        min:0
    },
    code:{
        type: String,
        required: true
    },
    used:{
      type: Boolean,
      required:true,
    },
    date:{
        type: Date,
        default: Date.now
    },

})

module.exports = mongoose.model('coupons', CouponSchema)