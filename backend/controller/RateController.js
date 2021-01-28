const express = require("express")
const router = express.Router();
const {RateService} = require("../service/index")
const Joi = require("@hapi/joi")
const authorization = require("../authorization/authorization")
const authentication = require("../auth/auth")
// request validation rules
const rateValidation = Joi.object({
    rateNumber:Joi.number().max(5).min(0.5).required(),
    ratedFood:Joi.string().optional(),
    ratedMix:Joi.string().optional(),
    comment:Joi.string().max(30).required(),

})

const idValidation = Joi.object({
    id: Joi.string().required()
})

const approvedValidation = Joi.object({
    approvedComment: Joi.number().min(-1).max(1).required()
})

const ratedFoodValidation = Joi.object({
    ratedFood: Joi.string().required()
})

const ratedMixValidation = Joi.object({
    ratedMix: Joi.string().required()
})



// get all
router.get(
    "/",
    async (req, res) => {

        try{
            const allRates = await RateService.getAll();
            res.status(200).json(allRates);
        }catch(err){
            res.status(404).json({message:err});
        }

    }
);

// get all comments
router.get(
    "/:approvedComment",
    async (req, res) => {
        const {error} = approvedValidation.validate(req.params);

        if(error)            
            return res.status(422).send(error.details[0].message);
        else{
            try{
                const allRates = await RateService.getAllComments(req.params.approvedComment);
                res.status(200).json(allRates);
            }catch(err){
                res.status(404).json({message:err});
            }
        }

    }
);

// get all comments by mix
router.get(
    "/ratedMix/:ratedMix",
    async (req, res) => {
        const {error} = ratedMixValidation.validate(req.params);

        if(error)            
            return res.status(422).send(error.details[0].message);
        else{
            try{
                const allRates = await RateService.getAllCommentsMix(req.params.ratedMix);
                res.status(200).json(allRates);
            }catch(err){
                res.status(404).json({message:err});
            }
        }

    }
);

// get all comments by food
router.get(
    "/ratedFood/:ratedFood",
    async (req, res) => {
        const {error} = ratedFoodValidation.validate(req.params);

        if(error)            
            return res.status(422).send(error.details[0].message);
        else{
            try{
                const allRates = await RateService.getAllCommentsFood(req.params.ratedFood);
                res.status(200).json(allRates);
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
                const oneRate = await RateService.getOne(req.params.id);
                res.status(200).json(oneRate)
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
    authorization.client,
    async (req, res) => {

        const {error} = rateValidation.validate(req.body);
        if(error)            
            return res.status(422).send(error.details[0].message);
        else{
            try{
                const savedRate = await RateService.insertOne(req, res);
                res.status(201).json(savedRate);
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
    authorization.admin,
    async (req, res) => {

        const {error} = idValidation.validate(req.params);
        const {error1} = approvedValidation.validate(req.params);

        if(error)            
            return res.status(422).send(error.details[0].message);
        else if(error1)            
            return res.status(422).send(error.details[0].message);
        else{
            try{
                const updateRate = await RateService.patchOne(req);
                res.status(200).json(updateRate);
            }catch(err){
                res.status(404).json({message:err});
            }
        }
    }
);


module.exports = router;