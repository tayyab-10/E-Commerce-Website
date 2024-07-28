const connectToMongo = require('./db');
const express = require('express');
const errorMiddleware=require("./Middleware/Error");

const dotenv=require("dotenv");

connectToMongo();
const app = express();

dotenv.config({path:"Backend/Config/config.env"});
const port=process.env.PORT;

//middleware to send and receive json type data
app.use(express.json());

//Available Routes 

app.use('/api/product', require('./Routes/ProductRoute'));


//Middleware for error
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})