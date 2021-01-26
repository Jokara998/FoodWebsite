const Coupon = require("../models/Coupon")

const getAll = async () => {
    const all = await Coupon.find();
    return all;
};

const getOne = async (id) => {
    const coupon = await Coupon.findById(id);
    return coupon;
};

const insertOne = async (newCoupon) => {
    const inserted = await newCoupon.save();
    return inserted;
};


const patchOnePercent = async (id, percent) => {
    const updatedC =  await Coupon.updateOne(
        { _id: id},
        { $set:
            {
                percent:percent
            }
        }
    );
    const c = await Coupon.findById(id);
    return c;
};

const patchOneUsed = async (id) => {
    const updatedC =  await Coupon.updateOne(
        { _id: id},
        { $set:
            {
                used:true
            }
        }
    );
    const c = await Coupon.findById(id);
    return c;
};




const deleteOne = async (id) => {
    try{
        const coupon = await Coupon.findById(id);
        const idd = coupon._id
        const deletedC = await Coupon.deleteOne({_id: id});        
        return idd;
    }catch(err){
        throw new Error(e.message);
    }
};


const getAllByClient = async (email) => {
    const all = await Coupon.find({email:email, used:false});
    return all;
};



module.exports = {
    getAll,
    getOne,
    insertOne,
    patchOnePercent,
    patchOneUsed,
    deleteOne,
    getAllByClient
};
