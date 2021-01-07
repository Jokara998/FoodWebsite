const mongoose = require("mongoose");

const FoodSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    availability:{
        type: [String],
        required: true
    },
    price:{
        type: Number,
        required: true,
        min:0
    },
    image:{
        type: Buffer,
        required: true
    },
    active:{
        type: Boolean,
        default: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    type:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"FoodType",
        required:true
    }

})

module.exports = mongoose.model('foods', FoodSchema)