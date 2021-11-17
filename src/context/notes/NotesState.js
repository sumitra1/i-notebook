
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState=(props)=>{
    
    
        const notesInitial=[
        {
          "_id": "619256b5ab36cf4701144309",
          "user": "6191ddcdc4c99e6b21afcc67",
          "title": "my first note",
          "description": "please write something.",
          "tag": "personal",
          "date": "2021-11-15T12:46:45.521Z",
          "__v": 0
        },
        {
          "_id": "61925766ab36cf470114430b",
          "user": "6191ddcdc4c99e6b21afcc67",
          "title": "my first note",
          "description": "please write something.",
          "tag": "personal",
          "date": "2021-11-15T12:49:42.995Z",
          "__v": 0
        },
        {
          "_id": "6192577fab36cf470114430d",
          "user": "6191ddcdc4c99e6b21afcc67",
          "title": "my first note",
          "description": "please write something.",
          "tag": "personal",
          "date": "2021-11-15T12:50:07.240Z",
          "__v": 0
        },
        {
          "_id": "61925780ab36cf470114430f",
          "user": "6191ddcdc4c99e6b21afcc67",
          "title": "my first note",
          "description": "please write something.",
          "tag": "personal",
          "date": "2021-11-15T12:50:08.663Z",
          "__v": 0
        },
        {
          "_id": "61925b687a6f7dc237bd4a53",
          "user": "6191ddcdc4c99e6b21afcc67",
          "title": "my first note",
          "description": "please write something.",
          "tag": "personal",
          "date": "2021-11-15T13:06:48.203Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial)
    return(
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;