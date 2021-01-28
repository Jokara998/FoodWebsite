const { UserCollection } = require("../database/index")
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Order = require("../models/Order")

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)
    return hashPassword;
}

const registerClient = async (body, res)=>{

    const user = await User.findOne({email:body.email})
    if(user){
        res.status(409).json({message:"Email already exist!"});
        return
    }

    // hash password
    const hashPass = await hashPassword(body.password)

    const newUser = User({
        name: body.name,
        surname: body.surname,
        email: body.email,
        password: hashPass,
        type: "Client",
        phone: body.phone,
        address: body.address
    })

    try{
        const savedUser = await UserCollection.insertOne(newUser)
        return savedUser._id;
    }catch(err){
        res.status(404).json({message:err});
    }

};

const registerWorker = async (body, res)=>{

    const user = await User.findOne({email:body.email})
    if(user){
        res.status(409).json({message:"Email already exist!"});
        return
    }

    // hash password
    const hashPass = await hashPassword(body.password)

    const newUser = User({
        name: body.name,
        surname: body.surname,
        email: body.email,
        password: hashPass,
        type: body.type,
        phone: body.phone,
        address: body.address
    })

    try{
        const worker = await UserCollection.insertOne(newUser)
        const dto = {
            "fullname": worker.name+" "+worker.surname,
            "email":worker.email,
            "address":worker.address,
            "phone":worker.phone,
            "id":worker._id
        }
        return dto;
    }catch(err){
        res.status(404).json({message:err});
    }

};

const login = async (body,res) =>{
    const user = await User.findOne({email:body.email});
    if(!user){
        res.status(401).json({message:"Email or password is wrong!"});
        return;
    }
    const validatePassword = await bcrypt.compare(body.password, user.password);
    if(!validatePassword){
        res.status(401).json({message:"Email or password is wrong!"});
        return;
    }

    // create jwt token
    const token = jwt.sign({email:user.email, type:user.type}, process.env.TOKEN_SECRET)
    res.header("Authorization", token).send(token);
    //res.cookie('authcookie', token,{maxAge:900000, httpOnly:true}) 


};

const getWorkers = async(res)=>{
    try{
        const workers = await UserCollection.getWorkers()
        const dtoWorkers = []
        for(let worker of workers){
            const dtoW = {
                "fullname": worker.name+" "+worker.surname,
                "email":worker.email,
                "address":worker.address,
                "phone":worker.phone,
                "id":worker._id
            }
            dtoWorkers.push(dtoW);
        }

        return dtoWorkers;
    }catch(err){
        res.status(404).send({message:err})
    }
};

const getClients = async(res)=>{
    try{
        const clients = await UserCollection.getClients()
        const dtoclients = []
        for(let client of clients){
            const dto = {
                "fullname": client.name+" "+client.surname,
                "email":client.email,
                "address":client.address,
                "phone":client.phone,
                "id":client._id
            }
            dtoclients.push(dto);
        }

        return dtoclients;
    }catch(err){
        res.status(404).send({message:err})
    }
};

const getApprovedClients = async(res)=>{
    try{
        const clients = await UserCollection.getApprovedClients()
        const dtoclients = []
        for(let client of clients){
            let ordersCount = await Order.countDocuments({email:client.email, state:"DELIVERED"})
            const dto = {
                "fullname": client.name+" "+client.surname,
                "email":client.email,
                "address":client.address,
                "phone":client.phone,
                "id":client._id,
                "orders":ordersCount
            }
            dtoclients.push(dto);
        }

        dtoclients.sort((a, b) => (a.orders < b.orders) ? 1 : -1)

        return dtoclients
    }catch(err){
        res.status(404).send({message:err})
    }
};


const deleteOne = async(id)=>{
    try{
        const deletedId =  await UserCollection.deleteOne(id);
        return deletedId;
    }catch(err){
        throw new Error(e.message);
    }
}

const patchOne = async (id, approved) =>{
    try{
        const patch =  await UserCollection.patchOne(id, approved);
        return patch._id;
    }catch(err){
        throw new Error(e.message);
    }
}

const getOneEmail = async (email) =>{
    try{
        const user =  await UserCollection.getOneEmail(email);
        let userDto ={
            name:user.name,
            surname:user.surname,
            address:user.address,
            phone:user.phone,
            id:user._id
        }
        return userDto;
    }catch(err){
        throw new Error(e.message);
    }
}

module.exports = {
    registerClient,
    registerWorker,
    login,
    getWorkers,
    getClients,
    deleteOne,
    patchOne,
    getOneEmail,
    getApprovedClients,
}