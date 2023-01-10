import React ,{useState} from "react";
import NoteContext from "./noteContext";
const NoteState = (props)=>
{
  const noteInitial =[];
  const [notes, setNotes] = useState(noteInitial)
  const apiURL = "http://localhost:5000/api/notes";
    

  //getting all ntoes
  const getNotes = async()=>{
    const response = await fetch(`${apiURL}/Get/All`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.        
      headers: {
        "Accept": "*/*",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        'Content-Type': 'application/json',
       'authtoken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0NWY5ZTgwNmI0Y2VmNjY3NmIyMGI5In0sImlhdCI6MTY2NTYwNjgzNX0.tmGs885WKInGAHDbxdpSntUdAeQdmgogeQmqNsM1DUM',
      },
    
     });
   const done = await  response.json()
   setNotes(done);
    
  }
    
      //Add note 
      const addNote = (title,description,tag) => {
      const  note = {
        
          "user": "6345f9e806b4cef6676b20b9",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2022-10-14T20:51:00.842Z",
          "__v": 0
        };
        console.log(note);
        setNotes(notes.concat(note))
      }       
      //edit note
      const editNote = async (id,t,des,tag) => {
       
        const response = await fetch(apiURL, {
          method: 'PUT', // *GET, POST, PUT, DELETE, etc.        
          headers: {
            'Content-Type': 'application/json',
           'authtoken': localStorage.getItem('_insPid'),
          },
        
          body: JSON.stringify(t,des,tag) // body data type must match "Content-Type" header
        });
         const result= response.json(); // parses JSON response into native JavaScript objects
      
        for (let index = 0; index < notes.length; index++) {
          const e = notes[index];
          if(e._id===id){
            e.title = t
            e.description = des
            e.tag = tag
          }
        }
        
      }
      //deletee note
      const deleteNote = async(id) => {      
        const response = await fetch(`${apiURL}/Delete/Note/${id}`, {
          method: 'DELETE', // *GET, POST, PUT, DELETE, etc.        
          headers: {
            'Content-Type': 'application/json',
           'authtoken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0NWY5ZTgwNmI0Y2VmNjY3NmIyMGI5In0sImlhdCI6MTY2NTYwNjgzNX0.tmGs885WKInGAHDbxdpSntUdAeQdmgogeQmqNsM1DUM',
          },
        
        });
        const json =response.json();// body data type must match "Content-Type" header
        //console.log(alert("noteDeleted"))
        const newNotes = notes.filter((note)=>{return note._id!==id})
         setNotes(newNotes)
      }
 return(
    <NoteContext.Provider value={{notes, getNotes,addNote,editNote,deleteNote}}>
        {props.children}
    </NoteContext.Provider>
 )
}
export default NoteState;