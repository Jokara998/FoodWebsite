const express = require("express")
const router = express.Router();
const {MixService} = require("../service/index")
const Joi = require("@hapi/joi")

// request validation rules

const mixValidation = Joi.object({
    name: Joi.string().max(30).required(),
    food: Joi.array().required(),
    discount: Joi.number().min(0).max(100).required(),
    availability: Joi.array().required(),
})

const idValidation = Joi.object({
    id: Joi.string().required()
})

// get all
router.get(
    "/",
    async (req, res) => {

        try{
            const allMix = await MixService.getAll();
            res.status(200).json(allMix);
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
                const oneMix = await MixService.getOne(req.params.id);
                res.status(200).json(oneMix)
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
        const {error} = mixValidation.validate(req.body);
        if(error)            
            return res.status(422).send(error.details[0].message);
        else{

            try{
                const savedMix = await MixService.insertOne(req, res);
                res.status(201).json(savedMix);
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
                const removedMix = await MixService.deleteOne(req.params.id);
                res.status(200).json(removedMix);
            }catch(err){
                res.status(404).json({message:err});
            }
        }
    }
);

// put one
router.put(
    "/:id",
    async (req, res) => {

        const {error} = idValidation.validate(req.params);
        const {error1} = mixValidation.validate(req.body);
        if(error)            
            return res.status(422).send(error.details[0].message);
        else if(error1)
            return res.status(422).send(error.details[0].message);
        else{
            try{
                const updateMix = await MixService.updateOne(req);
                res.status(200).json(updateMix);
            }catch(err){
                res.status(404).json({message:err});
            }
        }
    }
);


module.exports = router;