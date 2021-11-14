const mongoose = require('mongoose');

const NoteSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        unique:true
    },
   tag:{
        type:String,
        default:"General"
    },
    date:{
        type:String,
       default:DataTransfer.now
    }

  });

  module.export=mongoose.model('note',NoteSchema);