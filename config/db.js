const mongoose = require('mongoose');

const connectMongoDB = async () => {

    try{
        let connect = await mongoose.connect(process.env.MONGO_STRING)
        console.log(`Mongo connected successful HOST : ${ connect.connection.host }`.bgMagenta.black);

        mongoose.connection.on("error", (error) => {
            console.error("DB connection error", error)
        })

    }catch( error ){
        console.error("Could not connect to DB", error.toString())
    }

};

module.exports = connectMongoDB