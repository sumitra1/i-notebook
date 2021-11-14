const express = require('express');
const User = require('../models/User');
const router = express.Router(); 
const { body, validationResult } = require('express-validator');


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
//create anew user
    user=await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      })
 
    res.json({user})
}

catch(error){
    console.error(error.message);
    res.status(500).send("some error occured");
}
} )

module.exports = router