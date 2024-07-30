const connectToMongo = require('./db');
const express = require('express');
const errorMiddleware=require("./Middleware/Error");
const cookieparser=require("cookie-parser")
const dotenv=require("dotenv");

connectToMongo();

const app = express();

//Handling Uncaught error     This error is useful for shutting down the server because of some undefined variables e.g if i write clg youtube somthing it will throw the define eror and shut down the server
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise rejection`);
    process.exit(1);
})


dotenv.config({path:"Backend/Config/config.env"});
const port=process.env.PORT;

//middleware to send and receive json type data
app.use(express.json());
app.use(cookieparser());
//Available Routes 

app.use('/api/product', require('./Routes/ProductRoute'));

app.use('/api/auth', require("./Routes/UserRoute"));


//Middleware for error
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// Unhandled Promise Rejection     Made this function so there is no need to add a try catch block in the db.js file 
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise rejection`);

    server.close(() => {
        process.exit(1);
    });
});