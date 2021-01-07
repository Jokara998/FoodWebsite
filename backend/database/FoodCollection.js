const Food = require("../models/Food")

const getAll = async () => {
    const allFood = await Food.find();
    return allFood;
};

const getCount = async () => {
    const count = await Food.countDocuments();
    return count;
};

const getPage = async (limit,startIndex) => {
    const page = await Food.find().sort({date:-1}).limit(limit).skip(startIndex).exec()
    return page;
};

const getPageAndFilter = async (limit,startIndex, filter) => {
    if(filter.price != "" && filter.rate == "")
        return await Food.find().sort({price:filter.price}).limit(limit).skip(startIndex).exec()
    else if(filter.price == "" && filter.rate != "")
        return await Food.find().sort({rate:filter.rate}).limit(limit).skip(startIndex).exec()
    else if(filter.price != "" && filter.rate != "")
        return await Food.find().sort({price:filter.price, rate:filter.rate}).limit(limit).skip(startIndex).exec()
    else
        return await Food.find().sort({date:-1}).limit(limit).skip(startIndex).exec()
};


const getFiltered = async(type)=>{
    const filteredFood = await Food.find({type:type}).exec()
    return filteredFood;
}

const getOne = async (id) => {
    const food = await Food.findById(id);
    return food;
};

const insertOne = async (newFood) => {
    const insertedFood = await newFood.save();
    return insertedFood;
};

const deleteOne = async (id) => {
    try{
        const food = await Food.findById(id);
        const idd = food._id
        const deletedFood = await Food.deleteOne({_id: id});        
        return idd;
    }catch(err){
        throw new Error(e.message);
    }
};

const updateOne = async (id, name, type, description, price, availability, image) => {
    const updatedFood =  await Food.updateOne(
        { _id: id},
        { $set:
            {
                name: name,
                type: type,
                description: description,
                price: price,
                availability: availability,
                image: image,
            }
        }
    );
    const food = await Food.findById(id);
    return food;
};

const updateActive = async (id, active) => {
    const updatedFood =  await Food.updateOne(
        { _id: id},
        { $set:
            {
                active: active
            }
        }
    );
    
    return getOne(id);
};

module.exports = {
    getAll,
    getOne,
    getCount,
    getPage,
    getPageAndFilter,
    getFiltered,
    insertOne,
    deleteOne,
    updateOne,
    updateActive,
};
