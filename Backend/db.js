const mongoose = require('mongoose');
const dotenv=require("dotenv");

dotenv.config({path:"Backend/Config/config.env"});


const connectToMongo = async () => {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to the database");
    } 


module.exports = connectToMongo;