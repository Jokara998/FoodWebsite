const { RateCollection } = require("../database/index")
const Rate = require("../models/Rate")
const UserService = require("../service/UserService")
const getAll = async () =>{

    try{

        const rates = await RateCollection.getAll();
        return rates;
    }catch(err){
        throw new Error(e.message);
    }
}

const getAllComments = async (number) =>{

    try{

        const rates = await RateCollection.getAllComments(number);
        const ratesDto = []
        for(let rate of rates){
            const user = await UserService.getOneEmail(rate.email);
            let rateDto = {
                fullname: user.name+" "+user.surname,
                date: rate.date,
                comment: rate.comment,
                id: rate._id,

            }
            ratesDto.push(rateDto)
        }
        return ratesDto;
    }catch(err){
        throw new Error(e.message);
    }
}

const getAllCommentsMix = async (ratedMix) =>{

    try{

        const rates = await RateCollection.getAllCommentsMix(ratedMix);
        const ratesDto = []
        for(let rate of rates){
            const user = await UserService.getOneEmail(rate.email);
            let rateDto = {
                fullname: user.name+" "+user.surname,
                date: rate.date,
                comment: rate.comment,
                id: rate._id,
                rateNumber:rate.rateNumber,

            }
            ratesDto.push(rateDto)
        }
        return ratesDto;
    }catch(err){
        throw new Error(e.message);
    }
}

const getAllCommentsFood = async (ratedFood) =>{

    try{

        const rates = await RateCollection.getAllCommentsFood(ratedFood);
        const ratesDto = []
        for(let rate of rates){
            const user = await UserService.getOneEmail(rate.email);
            let rateDto = {
                fullname: user.name+" "+user.surname,
                date: rate.date,
                comment: rate.comment,
                id: rate._id,
                rateNumber:rate.rateNumber,


            }
            ratesDto.push(rateDto)
        }
        return ratesDto;
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
        const updatedRate = await RateCollection.patchOne(id, approved);
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
    calculateRateMix,
    getAllComments,
    getAllCommentsFood,
    getAllCommentsMix
  
};