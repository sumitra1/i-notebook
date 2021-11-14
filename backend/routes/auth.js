const express = require('express');
const User = require('../models/User');
const router = express.Router(); 
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET="Harryisagoodboy";


// Create a User using: POST "/api/auth/createuser". no log in required
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
] , async (req, res)=>{ 

    //if there are no errors,return bad requests and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    
//check whether the user with same email exists already
try{
let user=await User.findOne({email:req.body.email});

if(user){
    return res.status(400).json({error: "Sorry a user with this email already exists"})
}
const salt=await bcrypt.genSalt(10);
const secPass=await bcrypt.hash(req.body.password,salt)
//create anew user
    user=await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data={
          user:{
              id:user.id
          }
      }

    const authToken=jwt.sign(data,JWT_SECRET);
    //console.log(jwtData);
 
    res.json({authToken})
}

catch(error){
    console.error(error.message);
    res.status(500).send("some error occured");
}
} )

module.exports = router