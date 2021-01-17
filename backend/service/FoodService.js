const { FoodCollection } = require("../database/index")
const Food = require("../models/Food")
const FoodType = require("../models/FoodType")

// WORKER
const getAll = async () =>{

    try{

        const food = await FoodCollection.getAll();
        const dtoFood = []
        for (let f of food){
            
            const foodType = await FoodType.findById(f.type)
            const oneFood = {
                name:f.name,
                //type:foodType.name,
                //typeId:foodType.id,
                //description:f.description,
                //price:parseFloat(f.price),
                availability:f.availability,
                //image:f.image,
                active:f.active,
                date:f.date,
                id:f._id,
                //rate:4.5
            }
            if(oneFood.active)
                dtoFood.push(oneFood)
        }
        return dtoFood;
    }catch(err){
        throw new Error(e.message);
    }
}

const getPage = async (page, limit) =>{

    try{
        const startIndex = (page-1)*limit
        const endIndex = page*limit
        const pageFood = {}
        const dtoFood = []
        const foodLenght = await FoodCollection.getCount()

        const foods = await FoodCollection.getPage(limit, startIndex)
        for (let f of foods){
            const foodType = await FoodType.findById(f.type)
            const oneFood = {
                name:f.name,
                type:foodType.name,
                typeId:foodType.id,
                description:f.description,
                price:parseFloat(f.price),
                availability:f.availability,
                image:f.image,
                active:f.active,
                date:f.date,
                id:f._id,
                rate:4.5
            }
            dtoFood.push(oneFood)
        }

        pageFood.food = dtoFood
        pageFood.totalFood = foodLenght
        const totalLenght = foodLenght / limit
        if(totalLenght % 1 != 0){
            pageFood.lenghtFood = Math.ceil(totalLenght);
        }else{
            pageFood.lenghtFood = totalLenght;
        }    
        return pageFood;
    }catch(err){
        throw new Error(e.message);
    }
}

const getPageAndFilter = async (page, limit, price, rate, type) =>{

    try{
        const startIndex = (page-1)*limit
        const endIndex = page*limit
        const pageFood = {}
        const dtoFood = []

        const filter = {rate:"",price:""}
        if(rate == "Ascending")
            filter.rate = -1
        else if(rate == "Descending")
            filter.rate = 1
        
        if(price == "Ascending")
            filter.price = -1
        else if(price == "Descending")
            filter.price = 1

        const foods = await FoodCollection.getPageAndFilter(limit, startIndex, filter)
        const foodLenght = await FoodCollection.getCount()

        for (let f of foods){
            const foodType = await FoodType.findById(f.type)
            const oneFood = {
                name:f.name,
                type:foodType.name,
                typeId:foodType.id,
                description:f.description,
                price:parseFloat(f.price),
                availability:f.availability,
                image:f.image,
                active:f.active,
                date:f.date,
                id:f._id,
                rate:4.5
            }
            dtoFood.push(oneFood)
        }

        pageFood.food = dtoFood
        pageFood.totalFood = foodLenght
        const totalLenght = foodLenght / limit
        if(totalLenght % 1 != 0){
            pageFood.lenghtFood = Math.ceil(totalLenght);
        }else{
            pageFood.lenghtFood = totalLenght;
        }    
        return pageFood;
    }catch(err){
        throw new Error(e.message);
    }
}

// CLIENT

const getAllType = async (type) =>{

    try{

        const food = await FoodCollection.getAllType(type);
        const dtoFood = []
        for (let f of food){
            
            const foodType = await FoodType.findById(f.type)
            const oneFood = {
                name:f.name,
                //type:foodType.name,
                //typeId:foodType.id,
                //description:f.description,
                //price:parseFloat(f.price),
                availability:f.availability,
                //image:f.image,
                active:f.active,
                date:f.date,
                id:f._id,
                //rate:4.5
            }
            if(oneFood.active)
                dtoFood.push(oneFood)
        }
        return dtoFood;
    }catch(err){
        throw new Error(e.message);
    }
}

const getPageType = async (page, limit, type, count) =>{

    try{
        const startIndex = (page-1)*limit
        const endIndex = page*limit
        const pageFood = {}
        const dtoFood = []
        const foodLenght = count

        const foods = await FoodCollection.getPageType(limit, startIndex, type)
        for (let f of foods){
            const foodType = await FoodType.findById(f.type)
            const oneFood = {
                name:f.name,
                type:foodType.name,
                typeId:foodType.id,
                description:f.description,
                price:parseFloat(f.price),
                availability:f.availability,
                image:f.image,
                active:f.active,
                date:f.date,
                id:f._id,
                rate:4.5
            }
            dtoFood.push(oneFood)
        }

        pageFood.food = dtoFood
        pageFood.totalFood = foodLenght
        const totalLenght = foodLenght / limit
        if(totalLenght % 1 != 0){
            pageFood.lenghtFood = Math.ceil(totalLenght);
        }else{
            pageFood.lenghtFood = totalLenght;
        }    
        return pageFood;
    }catch(err){
        throw new Error(e.message);
    }
}

const getPageAndFilterType = async (page, limit, price, rate, type, count) =>{

    try{
        const startIndex = (page-1)*limit
        const endIndex = page*limit
        const pageFood = {}
        const dtoFood = []

        const filter = {rate:"",price:""}
        if(rate == "Ascending")
            filter.rate = -1
        else if(rate == "Descending")
            filter.rate = 1
        
        if(price == "Ascending")
            filter.price = -1
        else if(price == "Descending")
            filter.price = 1

        const foods = await FoodCollection.getPageAndFilterType(limit, startIndex, filter, type)
        const foodLenght = count

        for (let f of foods){
            const foodType = await FoodType.findById(f.type)
            const oneFood = {
                name:f.name,
                type:foodType.name,
                typeId:foodType.id,
                description:f.description,
                price:parseFloat(f.price),
                availability:f.availability,
                image:f.image,
                active:f.active,
                date:f.date,
                id:f._id,
                rate:4.5
            }
            dtoFood.push(oneFood)
        }

        pageFood.food = dtoFood
        pageFood.totalFood = foodLenght
        const totalLenght = foodLenght / limit
        if(totalLenght % 1 != 0){
            pageFood.lenghtFood = Math.ceil(totalLenght);
        }else{
            pageFood.lenghtFood = totalLenght;
        }    
        return pageFood;
    }catch(err){
        throw new Error(e.message);
    }
}


const getOne = async (id) =>{

    try{
        const food = await FoodCollection.getOne(id)
        const foodType = await FoodType.findById(food.type)

        const dtoFood = {
            name:food.name,
            type:foodType.name,
            typeId:foodType.id,
            description:food.description,
            price:parseFloat(food.price),
            availability:food.availability,
            image:food.image,
            active:food.active,
            date:food.date,
            id:food._id,
            rate:4.5
        }
        return dtoFood;
    }catch(err){
        throw new Error(e.message);
    }
}

const insertOne = async (req, res) =>{

    let decompressedImg = req.body.image.split('').map((c,i,a)=>i%2?undefined:new Array(2+parseInt(a[i+1],36)).join(c)).join('');
    const string64 = decompressedImg.split(',')
    const bytes = Buffer.from(string64[1], 'base64');

    const newFood = new Food({
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        price: parseFloat(req.body.price),
        availability: req.body.availability,
        image: bytes  
    });

    const food = await Food.findOne({name:newFood.name})
    if(food){
        res.status(409).json({message:"Food Name already exist"});
        return
    }



    try{
        const savedFood = await FoodCollection.insertOne(newFood);
        const foodType = await FoodType.findById(savedFood.type)
        const dtoFood = {
            name:savedFood.name,
            type:foodType.name,
            typeId:foodType.id,
            description:savedFood.description,
            price:parseFloat(savedFood.price),
            availability:savedFood.availability,
            image:savedFood.image,
            active:savedFood.active,
            date:savedFood.date,
            id:savedFood._id,
            rate:4.5
        }
        return dtoFood;
    }catch(err){
        throw new Error(e.message);
    }
}

const deleteOne = async (id) =>{

    try{
        const deletedFood =  await FoodCollection.deleteOne(id);
        return deletedFood;
    }catch(err){
        throw new Error(e.message);
    }
}

const updateOne = async (req) =>{

    const id = req.params.id
    const name = req.body.name;
    const type = req.body.type;
    const description = req.body.description;
    const price = parseFloat(req.body.price);
    const availability = req.body.availability;

    let decompressedImg = req.body.image.split('').map((c,i,a)=>i%2?undefined:new Array(2+parseInt(a[i+1],36)).join(c)).join('');
    const string64 = decompressedImg.split(',')
    const bytes = Buffer.from(string64[1], 'base64');
  
    try{
        const updatedFood = await FoodCollection.updateOne(id, name, type, description, price, availability, bytes);
        const foodType = await FoodType.findById(updatedFood.type)
        const dtoFood = {
            name:updatedFood.name,
            type:foodType.name,
            typeId:foodType.id,
            description:updatedFood.description,
            price:parseFloat(updatedFood.price),
            availability:updatedFood.availability,
            image:updatedFood.image,
            active:updatedFood.active,
            date:updatedFood.date,
            id:updatedFood._id,
            rate:4.5
        }
        return dtoFood;
    }catch(err){
        throw new Error(e.message);
    }
}

const updateActive = async (req) =>{

    const id = req.params.id
    const active = req.body.active  
    try{
        const updatedFood = await FoodCollection.updateActive(id, active);
        const dtoFood = {
            active:updatedFood.active,
            id:updatedFood._id
        }
        return dtoFood;
    }catch(err){
        throw new Error(e.message);
    }
}

module.exports = {
    getAll,
    getOne,
    insertOne,
    updateOne,
    deleteOne,
    getPage,
    getPageAndFilter,
    updateActive,
    getAllType,
    getPageType,
    getPageAndFilterType
};