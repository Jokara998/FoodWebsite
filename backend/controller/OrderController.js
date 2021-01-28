const express = require("express")
const router = express.Router();
const {OrderService} = require("../service/index")
const Joi = require("@hapi/joi")
const authorization = require("../authorization/authorization")
const authentication = require("../auth/auth")
// request validation rules

const orderValidation = Joi.object({
    name: Joi.string().optional(),
    surname: Joi.string().optional(),
    ordered: Joi.object().optional(),
    address: Joi.string().max(30).required(),
    phone: Joi.string().max(15).pattern(/^[0-9]+$/).required(),
    price: Joi.string().max(10).required(),

})

const idValidation = Joi.object({
    id: Joi.string().required()
})

const emailValidation = Joi.object({
    email: Joi.string().required()
})


const patchValidation = Joi.object({
    state: Joi.string().required()
})

const rejectValidation = Joi.object({
    state: Joi.string().required(),
    message: Joi.string().required()
})



// get all
router.get(
    "/",
    async (req, res) => {

        try{
            const allOrders = await OrderService.getAll();
            res.status(200).json(allOrders);
        }catch(err){
            res.status(404).json({message:err});
        }           
    }
);

// get by type
router.get(
    "/:state",
    authentication,
    async (req, res) => {
        const {error} = patchValidation.validate(req.params);
        if(error)            
            return res.status(422).send(error.details[0].message);
        else{
            try{
                const allOrders = await OrderService.getAllByType(req.params.state, req.user);
                res.status(200).json(allOrders);
            }catch(err){
                res.status(404).json({message:err});
            } 
        }          
    }
);


// get one
router.get(
    "/:id",
    async (req, res) => {

        const {error} = idValidation.validate(req.params);
        if(error)            
            return res.status(422).send(error.details[0].message);
        else{
            try{
                const oneOrder = await OrderService.getOne(req.params.id);
                res.status(200).json(oneOrder)
            }catch(err){
                res.status(404).json({message:err});
            }
        }
    }
);

// add one
router.post(
    "/",
    async (req, res) => {
        const {error} = orderValidation.validate(req.body);
        if(error)            
            return res.status(422).send(error.details[0].message);
        else{

            try{
                const savedOrder = await OrderService.insertOne(req, res);
                res.status(201).json(savedOrder);
            }catch(err){
                res.status(404).json({message:err});
            }
        }
    }
);


// add one
router.post(
    "/:email",
    authentication,
    authorization.client,
    async (req, res) => {
        const {error} = orderValidation.validate(req.body);
        const {error1} = emailValidation.validate(req.params);
        if(error || error1)            
            return res.status(422).send(error.details[0].message);
        else{

            try{
                const savedOrder = await OrderService.insertOneEmail(req, res);
                res.status(201).json(savedOrder);
            }catch(err){
                res.status(404).json({message:err});
            }
        }
    }
);

// patch one
router.patch(
    "/:id",
    authentication,
    authorization.worker_deliverer,
    async (req, res) => {

        const {error} = idValidation.validate(req.params);
        const {error1} = patchValidation.validate(req.body);
        if(error)            
            return res.status(422).send(error.details[0].message);
        else if(error1)
            return res.status(422).send(error.details[0].message);
        else{
            try{
                const patchOrder = await OrderService.patchOne(req)
                res.status(200).json(patchOrder);
            }catch(err){
                res.status(304).json({message:err});
            }
        }
    }
);

// patch one
router.patch(
    "/rated/:id",
    authentication,
    authorization.client,
    async (req, res) => {

        const {error} = idValidation.validate(req.params);
        if(error)            
            return res.status(422).send(error.details[0].message);
        else{
            try{
                const patchOrder = await OrderService.rateOne(req)
                res.status(200).json(patchOrder);
            }catch(err){
                res.status(304).json({message:err});
            }
        }
    }
);


// reject one
router.patch(
    "/reject/:id",
    authentication,
    authorization.worker,
    async (req, res) => {

        const {error} = idValidation.validate(req.params);
        const {error1} = rejectValidation.validate(req.body);
        if(error)            
            return res.status(422).send(error.details[0].message);
        else if(error1)
            return res.status(422).send(error.details[0].message);
        else{
            try{
                const patchOrder = await OrderService.rejectOne(req)
                res.status(200).json(patchOrder);
            }catch(err){
                res.status(304).json({message:err});
            }
        }
    }
);


module.exports = router;