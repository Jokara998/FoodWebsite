const express = require("express")
const router = express.Router();
const {UserService} = require("../service/index")
const Joi = require("@hapi/joi");
const User = require("../models/User");

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


const idValidation = Joi.object({
    id: Joi.string().required()
})

const emailValidation = Joi.object({
    email: Joi.string().required()
})

const approvedValidation = Joi.object({
    approved: Joi.boolean().required()
})

// REGISTER CLIENT
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
// REGISTER WORKER
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

// GET ALL WORKERS
router.get(
    "/worker",
    async (req, res) => {
        try{
            const workers = await UserService.getWorkers(res);
            res.status(200).json(workers)
        }catch(err){
            res.status(404).send({message:err})
        }
    }
);

// GET ALL UNAPPROVED CLIENTS
router.get(
    "/client",
    async (req, res) => {
        try{
            const clients = await UserService.getClients(res);
            res.status(200).json(clients)
        }catch(err){
            res.status(404).send({message:err})
        }
    }
);

// DELETE USER

router.delete(
  "/:id",
  async (req, res) =>{
        const {error} = idValidation.validate(req.params);
        if(error)            
            return res.status(422).send(error.details[0].message);
        else{
            try{
                const idd = await UserService.deleteOne(req.params.id);
                res.status(200).json(idd);
            }catch(err){
                res.status(404).json({message:err});
            }
        }
  }  
);

// PATCH CLIENT

router.patch(
    "/:id",
    async (req, res) =>{
          const {error} = idValidation.validate(req.params);
          const {error1} = approvedValidation.validate(req.body);
          if(error || error1)            
              return res.status(422).send(error.details[0].message);
          else{
              try{
                  const idd = await UserService.patchOne(req.params.id, req.body.approved);
                  res.status(200).json(idd);
              }catch(err){
                  res.status(304).json({message:err});
              }
          }
    }  
  );

// GET ONE

router.get(
    "/:email",
    async (req, res) =>{
          const {error} = emailValidation.validate(req.params);
          if(error)            
              return res.status(422).send(error.details[0].message);
          else{
              try{
                  const user = await UserService.getOneEmail(req.params.email);
                  res.status(200).json(user);
              }catch(err){
                  res.status(304).json({message:err});
              }
          }
    }  
);
  

module.exports = router;