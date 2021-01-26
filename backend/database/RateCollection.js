const Rate = require("../models/Rate")

const getAll = async () => {
    const allRates = await Rate.find();
    return allRates;
};

const getAllComments = async (number) => {
    const allRates = await Rate.find({approvedComment:number}).sort({date:-1});
    return allRates;
};

const getAllCommentsMix = async (ratedMix) => {
    const allRates = await Rate.find({ratedMix:ratedMix, approvedComment:1}).sort({date:-1});
    return allRates;
};

const getAllCommentsFood = async (ratedFood) => {
    const allRates = await Rate.find({ratedFood:ratedFood, approvedComment:1}).sort({date:-1});
    return allRates;
};

const getOne = async (id) => {
    const rate = await Rate.findById(id);
    return rate;
};

const insertOne = async (newRate) => {
    const insertedRate = await newRate.save();
    return insertedRate;
};


const patchOne = async (id, approved) => {
    const updatedRate =  await Rate.updateOne(
        { _id: id},
        { $set:
            {
                approvedComment:approved,
            }
        }
    );
    const rate = await Rate.findById(id);
    return rate;
};

const getAllByFood = async (id) => {
    const allRates = await Rate.find({ratedFood:id});
    return allRates;
};


const getAllByMix = async (id) => {
    const allRates = await Rate.find({ratedMix:id});
    return allRates;
};

module.exports = {
    getAll,
    getOne,
    insertOne,
    patchOne,
    getAllByMix,
    getAllByFood,
    getAllComments,
    getAllCommentsMix,
    getAllCommentsFood
};
