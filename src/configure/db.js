const mongoose = require('mongoose')

async function connectDB(){
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
      console.log("Database connected successfully")
    })
    .catch(err =>{
        console.log("Error connecting to Database")
        process.exit(1)
    })

}

module.exports=connectDB