const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
var fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


//Route1: Get all the notes using: GET "/api/auth/getuser" Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
try{
    const notes = await Note.find({ user: req.user.id })
    res.json(notes)
}
catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}

})

//Route2: add a new note using : POST "/api/auth/addnote" Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try{
        const {title,description,tag,}=req.body;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const notes=new Note({
        title,description,tag,user:req.user.id
    })
    const savedNote=await notes.save();
    res.json(savedNote)
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
   
})

    //Route3: update an existing note using : POST "/api/auth/updatenote" Login required

    router.put('/updatenote/:id', fetchuser,async (req, res) => {
    const{title,description,tag}=req.body;
    //Create a newNote object
    const newNote={};
    if(title){newNote.title=title};
    if(tag){newNote.tag=tag};
    if(title){newNote.description=description};

    //Find the note to be updated and update it
    let note=await Note.findById(req.params.id);
    if(!note){res.status(404).send("Not Found")}

    if(note.user.toString()!==req.user.id){

        return res.status(401).send("Not Allowed");
    }

    note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note});


})


module.exports = router