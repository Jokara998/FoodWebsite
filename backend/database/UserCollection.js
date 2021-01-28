const User = require("../models/User")

const getAll = async () =>{
    const users = await User.find();
    return users;
}

const getOne = async (id) =>{
    const user = await User.findById(id);
    return user;
}

const getOneEmail = async (email) =>{
    const user = await User.findOne({email:email});
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
        const clients = await User.find({type:"Client", approved:false});
        return clients;
    }catch(err){
        throw new Error(e.message);
    }
}

const getApprovedClients = async() =>{
    try{
        const clients = await User.find({type:"Client", approved:true});
        return clients;
    }catch(err){
        throw new Error(e.message);
    }
}

const patchOne = async(id, approved) =>{
    const patch =  await User.updateOne(
        { _id: id},
        { $set:
            {
                approved:approved
            }
        }
    );
    
    const client = await User.findById(id);
    return client
}

module.exports = {
    getAll,
    getOne,
    insertOne,
    updateOne,
    deleteOne,
    getWorkers,
    getClients,
    patchOne,
    getOneEmail,
    getApprovedClients
}