const mongoose = require('mongoose')

const FoodTypeSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("foodtype", FoodTypeSchema)