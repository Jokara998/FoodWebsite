
const client = async function (req, res, next){
   
    if(req.user.type == "Client"){
        next()
    }else{
        return res.status(403).send("Forbidden!")
    }
}

const worker = async function (req, res, next){
   
    if(req.user.type == "Worker"){
        next()
    }else{
        return res.status(403).send("Forbidden!")
    }
}

const deliverer = async function (req, res, next){
   
    if(req.user.type == "Deliverer"){
        next()
    }else{
        return res.status(403).send("Forbidden!")
    }
}

const admin = async function (req, res, next){
   
    if(req.user.type == "Admin"){
        next()
    }else{
        return res.status(403).send("Forbidden!")
    }
}

const admin_client = async function (req, res, next){
   
    if(req.user.type == "Admin" || req.user.type == "Client"){
        next()
    }else{
        return res.status(403).send("Forbidden!")
    }
}

const worker_deliverer = async function (req, res, next){
   
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