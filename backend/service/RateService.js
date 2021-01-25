const { RateCollection } = require("../database/index")
const Rate = require("../models/Rate")

const getAll = async () =>{

    try{

        const rates = await RateCollection.getAll();
        return rates;
    }catch(err){
        throw new Error(e.message);
    }
}

const getOne = async (id) =>{

    try{
        const rate = await RateCollection.getOne(id)
        return rate;
    }catch(err){
        throw new Error(e.message);
    }
}

const insertOne = async (req) =>{

    const newRate = new Rate({
        email:req.user.email,
        rateNumber:req.body.rateNumber,
        comment:req.body.comment,
    });
    if(req.body.ratedFood != undefined && req.body.ratedFood != "")
        newRate.ratedFood = req.body.ratedFood
    if(req.body.ratedMix != undefined && req.body.ratedMix != "")
        newRate.ratedMix = req.body.ratedMix


    try{
        const savedRate = await RateCollection.insertOne(newRate);
        return savedRate;
    }catch(err){
        throw new Error(e.message);
    }
}

const patchOne = async (req) =>{

    const approved = req.body.approved;
    const id = req.params.id;
    try{
        const updatedRate = await RateCollection.updateOne(id, approved);
        return updatedRate;
    }catch(err){
        throw new Error(e.message);
    }
}

const calculateRateFood = async (id) =>{
    const rates = await RateCollection.getAllByFood(id)
    let rate = 0
    let numRates = rates.length
    if(numRates == 0)
        return {rate:0,number:0};
    rates.forEach((element)=>{
        rate += +element.rateNumber
    })

    let rateObject = {
        rate:rate/numRates,
        number:numRates
    }
    return rateObject
}


const calculateRateMix = async (id) =>{
    const rates = await RateCollection.getAllByMix(id)
    let rate = 0
    let numRates = rates.length
    if(numRates == 0)
        return {rate:0,number:0};
    rates.forEach((element)=>{
        rate += +element.rateNumber
    })

    let rateObject = {
        rate:rate/numRates,
        number:numRates
    }

    return rateObject
}

module.exports = {
    getAll,
    getOne,
    insertOne,
    patchOne,
    calculateRateFood,
    calculateRateMix
  
};