const express = require("express");

const UserRouter = express.Router();
const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


UserRouter.post("/signup", async(req, res) => {
    const { name, email, password } = req.body;

    let read;
    try {
        read = await User.findOne({email}); 
    } catch (error) {
        console.log(error);
    }

if(read){
    return res.status(409).json({message: "Email Already Found, Please Login"});
}


const hassesdPassword = await bcrypt.hashSync(password);

const user = new User({
 name, email, password: hassesdPassword
})

try {
    await user.save();
} catch (error) {
    console.log(error);
}

return res.status(200).json({message: "Register Sucessfully"});


})

UserRouter.post("/signin", async(req, res) => {
    const {email, password} = req.body;
  
    let existing;
    try {
        existing = await User.findOne({email});
    } catch (error) {
        console.log(error);
    }

   if(!existing){
    return res.status(400).json({message: "Please Register, After Login"});
   }

   const comparePassword = await bcrypt.compareSync(password, existing.password);


   if(!comparePassword){
    return res.status(400).json({message: "Incorrect Password"});
   }

   const token = jwt.sign({_id: this._id}, process.env.JWTKEY,
    {
        "expiresIn":"1h"
    })

    return res.status(200).json({data: token, message: "Login Sucessfully", user: existing});
})


UserRouter.get(`/user/get/:id`, async(req, res) => {
   
    const id = req.params.id;
   
    let Users;
    try {
        Users = await User.findById(id);
    } catch (error) {
        console.log(error);
    }

    return res.status(200).json({Users});

})



UserRouter.patch("/update/:id", async(req, res) => {
    const id = req.params.id;

   const {age, gender, dob, mobilenumber} = req.body;

    let Res;
    try {
        Res = await User.findByIdAndUpdate(id, {age, gender, dob, mobilenumber})
    } catch (error) {
        console.log(error);
    }

    return res.status(200).json({message: "Update Sucessfully"});

})

module.exports = UserRouter;





