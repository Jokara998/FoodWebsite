const express = require("express")
const router = express.Router();
const {OrderService} = require("../service/index")
const Joi = require("@hapi/joi")

// request validation rules

const orderValidation = Joi.object({
    food: Joi.array(),
    mix: Joi.array(),
    address: Joi.string().max(30).required(),
    phone: Joi.string().max(15).pattern(/^[0-9]+$/).required(),
    price: Joi.string().max(10).required(),

})

const idValidation = Joi.object({
    id: Joi.string().required()
})

const patchValidation = Joi.object({
    state: Joi.string().required()
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

// delete one
router.delete(
    "/:id",
    async (req, res) => {
        const {error} = idValidation.validate(req.params);
        if(error)            
            return res.status(422).send(error.details[0].message);
        else{
            try{
                const removedOrder = await OrderService.deleteOne(req.params.id);
                res.status(200).json(removedOrder);
            }catch(err){
                res.status(404).json({message:err});
            }
        }
    }
);

// patch one
router.patch(
    "/:id",
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


module.exports = router;