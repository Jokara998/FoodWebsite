const { FoodTypeCollection } = require("../database/index")
const FoodType = require("../models/FoodType")
const Food = require("../models/Food")


const getAll = async () =>{

    try{

        const foodTypes = await FoodTypeCollection.getAll();
        const dtoFoodType = []
        for (let ft of foodTypes){

            const oneType = {
                name:ft.name,                
                date:ft.date,
                id:ft._id
            }
            dtoFoodType.push(oneType)
        }
        return dtoFoodType;
    }catch(err){
        throw new Error(e.message);
    }
}

const getOne = async (id) =>{

    try{
        const foodType = await FoodTypeCollection.getOne(id)
        const oneType = {
            name:foodType.name,                
            date:foodType.date,
            id:foodType._id
        }
        return oneType;
    }catch(err){
        throw new Error(e.message);
    }
}

const insertOne = async (req) =>{

    const newFoodType = new FoodType({
        name: req.body.name,
    });

    const foodType = await FoodType.findOne({name:newFoodType.name})
    if(foodType){
        res.status(409).json({message:"Food Type Name already exist"});
        return
    }

    try{
        const savedFoodType = await FoodTypeCollection.insertOne(newFoodType);
        const oneType = {
            name:savedFoodType.name,                
            date:savedFoodType.date,
            id:savedFoodType._id
        }
        return oneType;
    }catch(err){
        throw new Error(e.message);
    }
}

const checkOne = async(id) =>{
    try{
        const check = await Food.findOne({type:id})
        console.log(check)
        if(check == null)
            return true;
        else
            return false;

    }catch(err){

    }
}

const deleteOne = async (id) =>{

    try{
        const deletedFoodType =  await FoodTypeCollection.deleteOne(id);
        return deletedFoodType;
    }catch(err){
        throw new Error(e.message);
    }
}

const updateOne = async (req) =>{

    const name = req.body.name;
    const id = req.params.id;
    try{
        const updatedFoodType = await FoodTypeCollection.updateOne(id, name);
        const oneType = {
            name:updatedFoodType.name,                
            date:updatedFoodType.date,
            id:updatedFoodType._id
        }
        return oneType;
    }catch(err){
        throw new Error(e.message);
    }
}

module.exports = {
    getAll,
    getOne,
    insertOne,
    updateOne,
    deleteOne,
    checkOne
};