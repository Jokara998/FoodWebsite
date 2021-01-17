const Order = require('../models/Order')

const getAll = async () => {
    const allOrders = await Order.find();
    return allOrders;
};

const getOne = async (id) => {
    const order = await Order.findById(id);
    return order;
};

const insertOne = async (newOrder) => {
    const insertedOrder = await newOrder.save();
    return insertedOrder;
};

const deleteOne = async (id) => {
    try{
        const order = await Order.findById(id);
        const idd = order._id
        const deletedOrder = await Order.deleteOne({_id: id});        
        return idd;
    }catch(err){
        throw new Error(e.message);
    }
};

const patchOne = async (id, state) => {
    const updatedOrder =  await Order.updateOne(
        { _id: id},
        { $set:
            {
               state:state
            }
        }
    );
    const order = await Order.findById(id);
    return order;
};


module.exports = {
    getAll,
    getOne,
    insertOne,
    deleteOne,
    patchOne,
};
