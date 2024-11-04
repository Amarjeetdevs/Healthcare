const mongoose = require('mongoose');

require('dotenv').config();

const conncetDatabase = () => {
    mongoose
    .connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log('Database Connected');  
    })
    .catch((err)=>{
     console.log(err.message);
    })
}

module.exports= conncetDatabase();

