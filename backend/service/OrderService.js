const { OrderCollection } = require("../database/index")
const Order = require("../models/Order")
const User = require("../models/User")

const getAll = async () =>{

    try{

        const orders = await OrderCollection.getAll();
        const dtoOrders = []
        for(let order of orders){
            const dto = {
                
                id: order._id,
                state: order.state,
                fullname: order.name+" "+order.surname,
                email: order.email,
                ordered: order.ordered,
                date:order.date,
                rated:order.rated,
                price:order.price
                
            }
            dtoOrders.push(dto);
        }
        return dtoOrders;
    }catch(err){
        throw new Error(e.message);
    }
}

const getAllByType = async (state, user) =>{

    try{
        if(user.type == "Client"){
            if(state == "SENT"){
                const orders = await OrderCollection.getAllByTypeClient(state, user.email);
                const dtoOrders = []
                for(let order of orders){
                    const dto = {
                        id: order._id,
                        state: order.state,
                        fullname: order.name+" "+order.surname,
                        email: order.email,
                        ordered: order.ordered,
                        date:order.date,
                        rated:order.rated,
                        price:order.price
                    }
                    dtoOrders.push(dto);
                }
                return dtoOrders;
            }else{
                const orders = await OrderCollection.getAllByTypeClient(state, user.email);
                const dtoOrders = []
                for(let order of orders){
                    const dto = {
                        id: order._id,
                        state: order.state,
                        fullname: order.name+" "+order.surname,
                        email: order.email,
                        ordered: order.ordered,
                        date:order.date,
                        rated:order.rated,
                        price:order.price
                    }
                    dtoOrders.push(dto);
                }
                return dtoOrders;
            }
        }else{
            const orders = await OrderCollection.getAllByType(state);
            const dtoOrders = []
            for(let order of orders){
                const dto = {
                    id: order._id,
                    state: order.state,
                    fullname: order.name+" "+order.surname,
                    email: order.email,
                    ordered: order.ordered,
                    date:order.date,
                    rated:order.rated,
                    price:order.price
                }
                dtoOrders.push(dto);
            }
            return dtoOrders;
        }
    }catch(err){
        throw new Error(e.message);
    }
}

const getOne = async (id) =>{

    try{
        const order = await OrderCollection.getOne(id)
        const dto = {
            id: order._id,
            state: order.state,
            fullname: order.name+" "+order.surname,
            email: order.email,
            ordered: order.ordered,
            date:order.date,
            rated:order.rated,
            price:order.price,
            address:order.address,
            phone:order.phone,
        }
        
        return dto;
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


const rateOne = async (req) =>{

    const id = req.params.id
    try{
        const updatedOrder = await OrderCollection.rateOne(id);
        return updatedOrder;
    }catch(err){
        throw new Error(e.message);
    }
}


const rejectOne = async (req) =>{

    const id = req.params.id
    const state = req.body.state
    const message = req.body.message
    console.log(req.body)
    try{
        const rejectOrder = await OrderCollection.rejectOne(id, state, message);
        return rejectOrder;
    }catch(err){
        throw new Error(e.message);
    }
}


module.exports = {
    getAll,
    getOne,
    insertOne,
    insertOneEmail,
    patchOne,
    getAllByType,
    rejectOne,
    rateOne,
};