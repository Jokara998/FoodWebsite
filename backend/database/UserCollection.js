const User = require("../models/User")

const getAll = async () =>{
    const users = await User.find();
    return users;
}

const getOne = async (id) =>{
    const user = await User.findById(id);
    return user;
}

const insertOne = async (newUser) =>{
    const user = await newUser.save();
    return user;
}

const updateOne = async (id, password) =>{
    const updateUser =  await User.updateOne(
        { _id: id},
        { $set:
            {
               password:password
            }
        }
    );
    const user = await User.findById(id);
    return user;
}

const deleteOne = async (id) =>{
    try{
        const user = await User.findById(id);
        const idd = user._id
        const deletedUser = await User.deleteOne({_id: id});        
        return idd;
    }catch(err){
        throw new Error(e.message);
    }
}

const getWorkers = async() =>{
    try{
        const workers = await User.find({type:"Worker"});
        return workers;
    }catch(err){
        throw new Error(e.message);
    }
}

const getClients = async() =>{
    try{
        const clients = await User.find({type:"Client"});
        return clients;
    }catch(err){
        throw new Error(e.message);
    }
}

module.exports = {
    getAll,
    getOne,
    insertOne,
    updateOne,
    deleteOne,
    getWorkers,
    getClients,
}