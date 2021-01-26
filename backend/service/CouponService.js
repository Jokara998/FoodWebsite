const { CouponCollection } = require("../database/index")
const Coupon = require("../models/Coupon")

const getAll = async () =>{

    try{

        const co = await CouponCollection.getAll();
        return co;
    }catch(err){
        throw new Error(e.message);
    }
}

const getOne = async (id) =>{

    try{
        const c = await CouponCollection.getOne(id)
        return c;
    }catch(err){
        throw new Error(e.message);
    }
}

const insertOne = async (req) =>{

    const newC = new Coupon({
        email:req.body.email,
        percent:req.body.percent,
        used:false,
        code:"",

    });
    try{
        const savedC = await CouponCollection.insertOne(newC);
        return savedC;
    }catch(err){
        throw new Error(e.message);
    }
}

const patchOnePercent = async (req) =>{

    const percent = req.body.percent;
    const id = req.params.id;
    try{
        const updatedC = await CouponCollection.patchOnePercent(id, percent);
        return updatedC;
    }catch(err){
        throw new Error(e.message);
    }
}

const patchOneUsed = async (req) =>{

    const id = req.params.id;
    try{
        const updatedC = await CouponCollection.patchOneUsed(id);
        return updatedC;
    }catch(err){
        throw new Error(e.message);
    }
}

const deleteOne = async (req) =>{

    const id = req.params.id;
    try{
        const delC = await CouponCollection.deleteOne(id);
        return delC;
    }catch(err){
        throw new Error(e.message);
    }
}

const getAllByClient = async (req) =>{

    const email = req.params.email;
    try{
        const allC = await CouponCollection.getAllByClient(email);
        return allC;
    }catch(err){
        throw new Error(e.message);
    }
}



module.exports = {
    getAll,
    getOne,
    insertOne,
    patchOnePercent,
    patchOneUsed,
    deleteOne,
    getAllByClient
  
};