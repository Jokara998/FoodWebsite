const { MixCollection } = require("../database/index")
const Food = require("../models/Food")
const Mix = require("../models/Mix")
const RateService = require("../service/RateService")


const getAll = async () =>{

    try{

        const allMix = await MixCollection.getAll();
        const dtoMixs = []
        for (let mix of allMix){
            const dtoMix = {
                name: mix.name,
                discount : mix.discount,
                id: mix._id,
                availability: mix.availability,
                food:[],
            }
            dtoMix.rate = await RateService.calculateRateMix(mix._id)
            const foods = mix.food
            for(let food_id of foods){
                const food = await Food.findById(food_id)
                const dtoFood = {
                    name:food.name,
                    description:food.description,
                    price:parseFloat(food.price),
                    date:food.date,
                    id:food._id,
                    availability:food.availability
                }
                dtoMix.food.push(dtoFood)
            }
            dtoMixs.push(dtoMix)    
        }
        return dtoMixs;
    }catch(err){
        throw new Error(e.message);
    }
}

const getOne = async (id) =>{

    try{
        const oneMix = await MixCollection.getOne(id);
        const dtoMix = {
            name: oneMix.name,
            discount : oneMix.discount,
            id: oneMix._id,
            availability: oneMix.availability,
            food:[],

        }
        dtoMix.rate = await RateService.calculateRateMix(oneMix._id)
        const foods = oneMix.food
        for(let food_id of foods){
            const food = await Food.findById(food_id)
            const dtoFood = {
                name:food.name,
                description:food.description,
                price:parseFloat(food.price),
                date:food.date,
                id:food._id,
            }
            dtoMix.food.push(dtoFood)
        }       
        
        return dtoMix;
    }catch(err){
        throw new Error(e.message);
    }
}

const insertOne = async (req, res) =>{

  
    const newMix = new Mix({
        name: req.body.name,
        food: req.body.food,
        availability: req.body.availability,
        discount: req.body.discount,
    });

    try{
        const savedMix = await MixCollection.insertOne(newMix);
        const oneMix = await MixCollection.getOne(savedMix._id)
        const dtoMix = {
            name: oneMix.name,
            discount : oneMix.discount,
            id: oneMix._id,
            availability: oneMix.availability,
            food:[],

        }
        dtoMix.rate = {rate:0, number:0}
        const foods = oneMix.food
        for(let food_id of foods){
            const food = await Food.findById(food_id)
            const dtoFood = {
                name:food.name,
                description:food.description,
                price:parseFloat(food.price),
                date:food.date,
                id:food._id,
            }
            dtoMix.food.push(dtoFood)
        }       
        
        return dtoMix;
    }catch(err){
        throw new Error(e.message);
    }
}

const deleteOne = async (id) =>{

    try{
        const deletedMix =  await MixCollection.deleteOne(id);
        return deletedMix;
    }catch(err){
        throw new Error(e.message);
    }
}

const updateOne = async (req) =>{

    const id = req.params.id
    const name = req.body.name;
    const food = req.body.food;
    const discount = req.body.discount;
    const availability = req.body.availability;

    try{
        const updatedMix = await MixCollection.updateOne(id, name, food, availability, discount);
        const oneMix = await MixCollection.getOne(id)
        const dtoMix = {
            name: oneMix.name,
            discount : oneMix.discount,
            id: oneMix._id,
            availability: oneMix.availability,
            food:[],

        }
        dtoMix.rate = await RateService.calculateRateMix(id)
        const foods = oneMix.food
        for(let food_id of foods){
            const food = await Food.findById(food_id)
            const dtoFood = {
                name:food.name,
                description:food.description,
                price:parseFloat(food.price),
                date:food.date,
                id:food._id,
            }
            dtoMix.food.push(dtoFood)
        }       
        
        return dtoMix;
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
};