const FoodType = require("../models/FoodType")

const getAll = async () => {
    const allFood = await FoodType.find();
    return allFood;
};

const getOne = async (id) => {
    const food = await FoodType.findById(id);
    return food;
};

const insertOne = async (newType) => {
    const insertedFoodType = await newType.save();
    return insertedFoodType;
};

const deleteOne = async (id) => {
    try{
        const foodType = await FoodType.findById(id);
        const idd = foodType._id
        const deletedFoodtype = await FoodType.deleteOne({_id: id});        
        return idd;
    }catch(err){
        throw new Error(e.message);
    }
};

const updateOne = async (id, name) => {
    const updatedFoodType =  await FoodType.updateOne(
        { _id: id},
        { $set:
            {
                name: name,
            }
        }
    );
    const foodType = await FoodType.findById(id);
    return foodType;
};

module.exports = {
    getAll,
    getOne,
    insertOne,
    deleteOne,
    updateOne,
};
