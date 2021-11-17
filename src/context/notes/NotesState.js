
import NoteContext from "./noteContext";
import {useState} from 'react'
const NoteState=(props)=>{
    const s1={
        "name":"Sumitra",
        "class":"8"
    }
    const [state, setstate] = useState(s1);
    const update=()=>{
        setTimeout(()=>{
            setstate({
                "name":"Kavita",
                "class":"10"
            })
        },1000);
    }
    return(
        <NoteContext.Provider value={{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;