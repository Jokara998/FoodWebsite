const Mix = require("../models/Mix")

const getAll = async () => {
    const all = await Mix.find();
    return all;
};

const getOne = async (id) => {
    const mix = await Mix.findById(id);
    return mix;
};

const insertOne = async (newMix) => {
    const mix = await newMix.save();
    return mix;
};

const deleteOne = async (id) => {
    try{
        const mix = await Mix.findById(id);
        const idd = mix._id
        const deletedMix = await Mix.deleteOne({_id: id});        
        return idd;
    }catch(err){
        throw new Error(e.message);
    }
};

const updateOne = async (id, name, food, availability, discount) => {
    const updatedMix =  await Mix.updateOne(
        { _id: id},
        { $set:
            {   
                name: name,
                food: food,
                discount: discount,
                availability:availability
            }
        }
    );
    const mix = await Mix.findById(id);
    return mix;
};

module.exports = {
    getAll,
    getOne,
    insertOne,
    deleteOne,
    updateOne,
};
