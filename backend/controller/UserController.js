const express = require("express")
const router = express.Router();
const {UserService} = require("../service/index")
const Joi = require("@hapi/joi")

const registerValidate = Joi.object({
    name: Joi.string().max(30).required(),
    surname: Joi.string().max(30).required(),
    address: Joi.string().max(30).required(),
    phone: Joi.string().max(15).pattern(/^[0-9]+$/).required(),
    email: Joi.string().min(6).max(30).required().email(),
    password: Joi.string().min(6).max(30).required(),
});

const loginValidate = Joi.object({
    email: Joi.string().min(6).max(30).required().email(),
    password: Joi.string().min(6).max(30).required()
});

router.post(
    "/register/client",
    async (req, res) =>{

        const {error} = registerValidate.validate(req.body);
        if(error)            
            return res.status(422).send(error.details[0].message);
        else{
            try{
                const registerUser = await UserService.registerClient(req.body,res);
                res.status(201).json(registerUser)
            }catch(err){
                res.status(404).json({message:err});
            }
        }
    }
);

router.post(
    "/register/worker",
    async (req, res) =>{

        const {error} = registerValidate.validate(req.body);
        if(error)            
            return res.status(422).send(error.details[0].message);
        else{
            try{
                const registerUser = await UserService.registerWorker(req.body,res);
                res.status(201).json(registerUser)
            }catch(err){
                res.status(404).json({message:err});
            }
        }
    }
);

router.post(
    "/login",
    async (req, res) => {
        const {error} = loginValidate.validate(req.body);
        if(error)            
            return res.status(422).send(error.details[0].message);
        else{
            try{
                const loginUser = await UserService.login(req.body,res);
                res.status(200).json(loginUser)
            }catch(err){
                res.status(404).json({message:err});
            }
        }
    }
);

router.get(
    "/logout",
    async (req, res) => {
        res.header("Authorization", "")
        res.status(200).send("Logged out...")
    }
);


module.exports = router;