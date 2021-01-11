const mongoose = require('mongoose')

const MixSchema = mongoose.Schema({

    name:{
        type: String,
        required: true,
        unique: true,
        max:30
    },
    food:{
        type:[mongoose.Schema.Types.ObjectId],
        required:true,
    },
    availability:{
        type:[String],
        required:true,
    },
    discount:{
        type:Number,
        required: true,
        max:100,
        min:0,
    },
    
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("mixs", MixSchema)