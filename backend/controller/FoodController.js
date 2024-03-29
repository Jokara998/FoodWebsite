const express = require("express")
const router = express.Router();
const {FoodService} = require("../service/index")
const Joi = require("@hapi/joi")
const authorization = require("../authorization/authorization")
const authentication = require("../auth/auth")

// request validation rules

const foodValidation = Joi.object({
    name: Joi.string().max(30).required(),
    description: Joi.string().max(50).required(),
    price: Joi.string().max(10).pattern(/^(?!^0\.00$)(([1-9][\d]{0,6})|([0]))\.[\d]{2}$/).required(),
    type: Joi.string().required(),
    availability: Joi.array().required(),
    image: Joi.string().required()
})

const idValidation = Joi.object({
    id: Joi.string().required()
})

const patchValidation = Joi.object({
    active: Joi.string().required()
})

const pageValidation = Joi.object({
    page: Joi.string(),
    limit: Joi.string(),
    price: Joi.string().allow(''),
    rate: Joi.string().allow('')
})

const pageOrderValidation = Joi.object({
    page: Joi.string(),
    limit: Joi.string(),
    type: Joi.string().required(),
    count: Joi.string().required(),
    price: Joi.string().allow(''),
    rate: Joi.string().allow('')
})



// get all for workers
router.get(
    "/",
    async (req, res) => {

        //http://localhost:8080/food?type=Barbecue,Pizza - filter
        //http://localhost:8080/food?page=1&limit=4 - pagination
        const {error} = pageValidation.validate(req.query);
        if(error)            
            return res.status(422).send(error.details[0].message);
        else{
         
            const page = parseInt(req.query.page)
            const limit = parseInt(req.query.limit)
            const price = req.query.price
            const rate = req.query.rate

            if(isNaN(page) && isNaN(limit)){

                try{
                    const allFood = await FoodService.getAll();
                    res.status(200).json(allFood);
                }catch(err){
                    res.status(404).json({message:err});
                }

            }else if(page != "" && limit != "" && price==undefined && rate == undefined){
                try{
                    const allFood = await FoodService.getPage(page,limit);
                    res.status(200).json(allFood);
                }catch(err){
                    res.status(404).json({message:err});
                }
            }else if(page != "" && limit != "" && (price!=undefined || rate!=undefined)){
                try{
                    const allFood = await FoodService.getPageAndFilter(page,limit,price,rate);
                    res.status(200).json(allFood);
                }catch(err){
                    res.status(404).json({message:err});
                }
            }
        }
    }
);

// get all for clients
router.get(
    "/type",
    async (req, res) => {

        //http://localhost:8080/food/type?type=Barbecue,Pizza - filter
        //http://localhost:8080/food/type?page=1&limit=4 - pagination
        const {error} = pageOrderValidation.validate(req.query);
        if(error)            
            return res.status(422).send(error.details[0].message);
        else{
         
            const page = parseInt(req.query.page)
            const limit = parseInt(req.query.limit)
            const type = req.query.type
            const count = parseInt(req.query.count)
            const price = req.query.price
            const rate = req.query.rate

            if(isNaN(page) && isNaN(limit)){

                try{
                    const allFood = await FoodService.getAllType(type);
                    res.status(200).json(allFood);
                }catch(err){
                    res.status(404).json({message:err});
                }

            }else if(page != "" && limit != "" && price==undefined && rate == undefined){
                try{
                    const allFood = await FoodService.getPageType(page,limit,type, count);
                    res.status(200).json(allFood);
                }catch(err){
                    res.status(404).json({message:err});
                }
            }else if(page != "" && limit != "" && (price!=undefined || rate!=undefined)){
                try{
                    const allFood = await FoodService.getPageAndFilterType(page,limit,price,rate,type, count);
                    res.status(200).json(allFood);
                }catch(err){
                    res.status(404).json({message:err});
                }
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
                const oneFood = await FoodService.getOne(req.params.id);
                res.status(200).json(oneFood)
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
    authorization.worker,
    async (req, res) => {
        const {error} = foodValidation.validate(req.body);
        if(error)            
            return res.status(422).send(error.details[0].message);
        else{

            try{
                const savedFood = await FoodService.insertOne(req, res);
                res.status(201).json(savedFood);
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
    authorization.worker,
    async (req, res) => {
        const {error} = idValidation.validate(req.params);
        if(error)            
            return res.status(422).send(error.details[0].message);
        else{
            try{
                const removedFood = await FoodService.deleteOne(req.params.id);
                res.status(200).json(removedFood);
            }catch(err){
                res.status(404).json({message:err});
            }
        }
    }
);

// put one
router.put(
    "/:id",
    authentication,
    authorization.worker,
    async (req, res) => {

        const {error} = idValidation.validate(req.params);
        const {error1} = foodValidation.validate(req.body);
        if(error)            
            return res.status(422).send(error.details[0].message);
        else if(error1)
            return res.status(422).send(error.details[0].message);
        else{
            try{
                const updateFood = await FoodService.updateOne(req);
                res.status(200).json(updateFood);
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
    authorization.worker,
    async (req, res) => {

        const {error} = idValidation.validate(req.params);
        const {error1} = patchValidation.validate(req.body);
        if(error)            
            return res.status(422).send(error.details[0].message);
        else if(error1)
            return res.status(422).send(error.details[0].message);
        else{
            try{
                const patchFood = await FoodService.updateActive(req)
                res.status(200).json(patchFood);
            }catch(err){
                res.status(304).json({message:err});
            }
        }
    }
);


module.exports = router;