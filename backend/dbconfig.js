 const mongoose = require('mongoose')
 const mongoURI = "mongodb://localhost:27017/inotebook?directConnection=true&ssl=false"

 const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected")
    })
 }
 module.exports = connectToMongo;