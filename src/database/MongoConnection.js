const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.userDB}:${process.env.passDB}@prueba.bqc6bwy.mongodb.net/${process.env.nameDB}?retryWrites=true&w=majority&appName=prueba`)
        

    } catch (error) {
        console.log(error);
    }
}

module.exports = { connectDB }