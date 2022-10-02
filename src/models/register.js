const Counter=require("./counter");

const mongoose = require("mongoose");
const regSchema = mongoose.Schema({
    _id:Number,
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Phone:{
        type:Number,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true
    },
    CPassword:{
        type:String,
        required:true
    }
},
{_id:false}
);
regSchema.pre("save",function(next){
    let doc = this;
    Counter.getSequenceNextValue("user_id").then(counter=>{
        console.log("done",counter);
        if(!counter){
            Counter.insertCounter("user_id").then(counter=>{
                doc._id=counter;
                console.log(doc)
                next();
            }).catch(error=>next(error));
        }else{
            doc._id=counter;
            next();
        }
    }).catch(error=>next(error));
});
module.exports= mongoose.model("Register",regSchema);