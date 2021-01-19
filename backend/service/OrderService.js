const { OrderCollection } = require("../database/index")
const Order = require("../models/Order")
const User = require("../models/User")

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
        name: req.body.name,
        surname: req.body.surname,
        email:"None",
        address: req.body.address,
        phone: req.body.phone,
        price: parseFloat(req.body.price),
        ordered: req.body.ordered
    });

    try{
        const savedOrder = await OrderCollection.insertOne(newOrder);
        return savedOrder;
    }catch(err){
        throw new Error(e.message);
    }
}

const insertOneEmail = async (req, res) =>{

    const user = await User.findOne({email:req.params.email})

    const newOrder = new Order({
        state: "PROCESSING",
        name: user.name,
        surname: user.surname,
        email: user.email,
        address: user.address,
        phone: user.phone,
        price: parseFloat(req.body.price),
        ordered: req.body.ordered
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
    insertOneEmail,
    deleteOne,
    patchOne,
};