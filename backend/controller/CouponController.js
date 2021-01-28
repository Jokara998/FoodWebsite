const express = require("express")
const router = express.Router();
const {CouponService} = require("../service/index")
const Joi = require("@hapi/joi")
const authentication = require("../auth/auth")
const authorization = require("../authorization/authorization")

// request validation rules
const couponValidation = Joi.object({
    percent:Joi.number().max(99).min(0.1).required(),
    email:Joi.string().required(),

})

const percentValidation = Joi.object({
    percent:Joi.number().max(99).min(0.1).required(),
})

const emailValidation = Joi.object({
    email:Joi.string().required(),
})

const idValidation = Joi.object({
    id: Joi.string().required()
})

const codeValidation = Joi.object({
    code: Joi.string().max(15).required()
})


// get all
router.get(
    "/",
    async (req, res) => {

        try{
            const all = await CouponService.getAll();
            res.status(200).json(all);
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
                const oneC = await CouponService.getOne(req.params.id);
                res.status(200).json(oneC)
            }catch(err){
                res.status(404).json({message:err});
            }
        }
    }
);

// get one
router.get(
    "/code/:code",
    authentication,
    authorization.client,
    async (req, res) => {

        const {error} = codeValidation.validate(req.params);
        if(error)            
            return res.status(422).send(error.details[0].message);
        else{
            try{
                const validate = await CouponService.getCodeCheck(req.params.code, req.user.email);
                res.status(200).json(validate)
            }catch(err){
                res.status(404).json({message:err});
            }
        }
    }
);

// add one
router.post(
    "/",
    authentication,
    authorization.admin,
    async (req, res) => {


        const {error} = couponValidation.validate(req.body);
        if(error)            
            return res.status(422).send(error.details[0].message);
        else{
            try{
                const savedC = await CouponService.insertOne(req, res);
                res.status(201).json(savedC);
            }catch(err){
                res.status(404).json({message:err});
            }
        }
        
    }
);

// patch one percent
router.patch(
    "/used/:id",
    authentication,
    authorization.client,
    async (req, res) => {

        const {error} = idValidation.validate(req.params);

        if(error)            
            return res.status(422).send(error.details[0].message);
        else{
            try{
                const updateC = await CouponService.patchOneUsed(req);
                res.status(200).json(updateC);
            }catch(err){
                res.status(404).json({message:err});
            }
        }
    }
);

// patch one used
router.patch(
    "/percent/:id",
    authentication,
    authorization.admin,
    async (req, res) => {

        const {error} = idValidation.validate(req.params);
        const {error1} = percentValidation.validate(req.params);


        if(error)            
            return res.status(422).send(error.details[0].message);
        else if(error1)            
            return res.status(422).send(error.details[0].message);
        else{
            try{
                const updateC = await CouponService.patchOnePercent(req);
                res.status(200).json(updateC);
            }catch(err){
                res.status(404).json({message:err});
            }
        }
    }
);


// delete one
router.delete(
    "/:id",
    authentication,
    authorization.admin,
    async (req, res) => {

        const {error} = idValidation.validate(req.params);
        if(error)            
            return res.status(422).send(error.details[0].message);
        else{
            try{
                const removedC = await CouponService.deleteOne(req.params.id);
                res.status(200).json(removedC);
            }catch(err){
                res.status(404).json({message:err});
            }
        }
    }
);

// get all by client email
router.get(
    "/email/:email",
    authentication,
    authorization.admin_client,
    async (req, res) => {

        const {error} = emailValidation.validate(req.params);

        if(error)            
            return res.status(422).send(error.details[0].message);
        else{

            try{
                const all = await CouponService.getAllByClient(req);
                res.status(200).json(all);
            }catch(err){
                res.status(404).json({message:err});
            }
        }

    }
);

module.exports = router;