const express = require("express")
const morgan = require("morgan");
const dotenv = require("dotenv").config()
const color = require("colors")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const rateLimit = require('express-rate-limit')
const createError = require('http-errors')
const connectMongoDB = require("./config/db");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const seedRouter = require("./routes/seedRoute");
const { errorResponse } = require("./controller/responseController");
const categoryRouter = require("./routes/categoryRoute");
const productRouter = require("./routes/productRouter");

// application init
const app = express()

// create api request limit function
const rateLimiter = rateLimit({
    windowMs: 1*60*1000, //1 minute
    max: 5,
    message: "Too many request from this IP, Try again later"
})

// app middleware init
app.use(morgan("dev"))
app.use(rateLimiter)
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cookieParser());
app.use(cors())


// environment variable init
const PORT = process.env.SERVER_PORT || 5050

// api routing
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/seed', seedRouter);

// server listener
app.listen( PORT, () =>  {
    connectMongoDB();
    console.log(`SERVER is runing on PORT : ${ PORT }`.bgGreen.black);
})

// client error handling 
app.use((req,res,next) => {
    next(createError(res.status(404).json({message: "route not found"})))
})

// server error handling 
app.use((err,req,res,next) => {
    errorResponse(res, {
        statusCode: err.status,
        message: err.message
    })
})