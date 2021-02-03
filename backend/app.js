const express = require("express");
const app = express();
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require('cookie-parser')

require('dotenv/config')

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true , limit:'50mb' }));
app.use(express.json({limit: '50mb', extended: true}));
app.use(cookieParser())


// Routes
const FoodRouter = require("./controller/FoodController");
const FoodTypeRouter = require("./controller/FoodTypeController")
const UserRouter = require("./controller/UserController")
const MixRounter = require("./controller/MixController")
const OrderRouter = require("./controller/OrderController")
const RateRouter = require("./controller/RateController")
const CouponRouter = require("./controller/CouponController")
app.use("/food", FoodRouter)
app.use("/foodtype", FoodTypeRouter)
app.use("/user", UserRouter)
app.use("/mix", MixRounter)
app.use("/order", OrderRouter)
app.use("/rate", RateRouter)
app.use("/coupon", CouponRouter)

// Database connection
mongoose.connect(
    process.env.DB_CONNECTION,
    { 
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }, ()=> console.log('connected to db!')
)

//Handle production
if(process.env.NODE_ENV === "production"){
    // Static folder
    app.use(express.static(__dirname+"/dist/"));
    // Handle SPA
    app.get(/.*/, (req,res) =>{
        res.sendFile(__dirname + "/dist/index.html")
    })
}

const PORT = process.env.PORT || 8080;
app.listen(PORT);

