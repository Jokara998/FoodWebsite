const { OrderCollection } = require("../database/index")
const Order = require("../models/Order")

const getAll = async () =>{

    try{

        const orders = await OrderCollection.getAll();
    
        return orders;
    }catch(err){
        throw new Error(e.message);
    }
}

const getOne = async (id) =>{

    try{
        const order = await OrderCollection.getOne(id)
        return order;
    }catch(err){
        throw new Error(e.message);
    }
}

const insertOne = async (req, res) =>{

    const newOrder = new Order({
        state: "PROCESSING",
        client: "",
        food: res.body.food,
        mix: res.body.mix,
        address: res.body.address,
        phone: res.body.phone,
        price: res.body.price,
    });

    try{
        const savedOrder = await OrderCollection.insertOne(newOrder);
        return savedOrder;
    }catch(err){
        throw new Error(e.message);
    }
}

const deleteOne = async (id) =>{

    try{
        const deletedOrder =  await OrderCollection.deleteOne(id);
        return deletedOrder;
    }catch(err){
        throw new Error(e.message);
    }
}

const patchOne = async (req) =>{

    const id = req.params.id
    const state = req.body.state
    try{
        const updatedOrder = await OrderCollection.patchOne(id, state);
        return updatedOrder;
    }catch(err){
        throw new Error(e.message);
    }
}

module.exports = {
    getAll,
    getOne,
    insertOne,
    deleteOne,
    patchOne,
};