const { UserCollection } = require("../database/index")
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

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

    const user = await User.find({email:body.email})
    if(user){
        res.status(409).json({message:"Email already exist!"});
        return
    }

    const newUser = User({
        name: body.name,
        surname: body.surname,
        email: body.email,
        password: body.password,
        type: "Worker",
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



module.exports = {
    registerClient,
    registerWorker,
    login,
}