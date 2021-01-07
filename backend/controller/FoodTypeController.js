const express = require("express")
const router = express.Router();
const {FoodTypeService} = require("../service/index")
const Joi = require("@hapi/joi")

// request validation rules
const foodTypeValidation = Joi.object({
    name: Joi.string().max(30).required()
})

const idValidation = Joi.object({
    id: Joi.string().required()
})


// get all
router.get(
    "/",
    async (req, res) => {

        try{
            const allFoodTypes = await FoodTypeService.getAll();
            res.status(200).json(allFoodTypes);
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
                const oneFoodType = await FoodTypeService.getOne(req.params.id);
                res.status(200).json(oneFoodType)
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

        const {error} = foodTypeValidation.validate(req.body);
        if(error)            
            return res.status(422).send(error.details[0].message);
        else{
            try{
                const savedFoodType = await FoodTypeService.insertOne(req, res);
                res.status(201).json(savedFoodType);
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
                const removedFoodType = await FoodTypeService.deleteOne(req.params.id);
                res.status(200).json(removedFoodType);
            }catch(err){
                res.status(404).json({message:err});
            }
        }
    }
);

// check one
router.get(
    "/check/:id",
    async (req, res) => {

        const {error} = idValidation.validate(req.params);
        if(error)            
            return res.status(422).send(error.details[0].message);
        else{
            try{
                const check = await FoodTypeService.checkOne(req.params.id);
                res.status(200).json(check);
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
        const {error1} = foodTypeValidation.validate(req.body);

        if(error)            
            return res.status(422).send(error.details[0].message);
        else if(error1)            
            return res.status(422).send(error.details[0].message);
        else{
            try{
                const updateFoodType = await FoodTypeService.updateOne(req);
                res.status(200).json(updateFoodType);
            }catch(err){
                res.status(404).json({message:err});
            }
        }
    }
);


module.exports = router;