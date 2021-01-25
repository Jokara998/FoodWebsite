const Order = require('../models/Order')

const getAll = async () => {
    const allOrders = await Order.find();
    return allOrders;
};

const getAllByType = async (state) => {
    const allOrders = await Order.find({state:state}).sort({date:-1});
    return allOrders;
};

const getAllByTypeClient = async (state, email) => {
    if(state == "SENT"){
        const allOrders = await Order.find({state:{$ne:"DELIVERED"}, email:email}).sort({date:-1,state:-1});
        return allOrders;
    }else{
        const allOrders = await Order.find({state:state, email:email}).sort({date:-1,state:-1,rated:-1});
        return allOrders;
    }
};


const getOne = async (id) => {
    const order = await Order.findById(id);
    return order;
};

const insertOne = async (newOrder) => {
    const insertedOrder = await newOrder.save();
    return insertedOrder;
};

const patchOne = async (id, state) => {
    const updatedOrder =  await Order.updateOne(
        { _id: id},
        { $set:
            {
               state:state,
               date:Date.now(),
            }
        }
    );
    const order = await Order.findById(id);
    return order;
};

const rateOne = async (id) => {
    const updatedOrder =  await Order.updateOne(
        { _id: id},
        { $set:
            {
               rated:true,
               date:Date.now(),
            }
        }
    );
    const order = await Order.findById(id);
    return order;
};

const rejectOne = async (id, state, message) => {
    const updatedOrder =  await Order.updateOne(
        { _id: id},
        { $set:
            {
               state:state,
               message:message,
               date:Date.now(),
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
    patchOne,
    getAllByType,
    rejectOne,
    getAllByTypeClient,
    rateOne
};
