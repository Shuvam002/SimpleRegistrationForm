const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/lol",{
    
}).then(()=>{
    console.log(`connection successful`);
}).catch((e)=>{
    console.log(`thik se kar bhondu`);
})