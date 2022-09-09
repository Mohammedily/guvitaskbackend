const mongoose = require("mongoose");



const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true  
    },
    password:{
        type:String,
        required: true  
    },
    age:{
        type:String, 
    },
    gender:{
        type:String,
    },
    dob:{
        type:String, 
    },
    mobilenumber:{
        type:String,
    }
});


const User = new mongoose.model("User", UserSchema);

module.exports = User;
