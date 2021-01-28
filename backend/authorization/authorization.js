
const client = function (req, res, next){
   
    if(req.user.type == "Client"){
        next()
    }else{
        return res.status(403).send("Forbidden!")
    }
}

const worker = function (req, res, next){
   
    if(req.user.type == "Worker"){
        next()
    }else{
        return res.status(403).send("Forbidden!")
    }
}

const deliverer = function (req, res, next){
   
    if(req.user.type == "Deliverer"){
        next()
    }else{
        return res.status(403).send("Forbidden!")
    }
}

const admin = function (req, res, next){
   
    if(req.user.type == "Admin"){
        next()
    }else{
        return res.status(403).send("Forbidden!")
    }
}

const admin_client = function (req, res, next){
   
    if(req.user.type == "Admin" || req.user.type == "Client"){
        next()
    }else{
        return res.status(403).send("Forbidden!")
    }
}

const worker_deliverer = function (req, res, next){
   
    if(req.user.type == "Worker" || req.user.type == "Deliverer"){
        next()
    }else{
        return res.status(403).send("Forbidden!")
    }
}




module.exports = {
    client,
    worker,
    deliverer,
    admin,
    admin_client,
    worker_deliverer
}