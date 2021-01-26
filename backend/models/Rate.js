const mongoose = require("mongoose");

const RateSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    rateNumber:{
        type: Number,
        required: true,
        min:0
    },
    comment:{
        type: String,
        required: true
    },
    approvedComment:{
      type: Number,
      default:0
    },
    ratedFood:{
        type: mongoose.Schema.Types.ObjectId,
    },
    ratedMix:{
        type: mongoose.Schema.Types.ObjectId,
    },
    date:{
        type: Date,
        default: Date.now
    },

})

module.exports = mongoose.model('rates', RateSchema)