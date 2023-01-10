import React, { useContext,useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";

const MyNotes = (props) => {
  const context = useContext(noteContext);
  const { notes,getNotes } = context;
 useEffect(() => {
  if(localStorage.getItem('_insPid')){
    getNotes();
  }else{
    
  }
 
 }, [])
  



  return (
    <div>
  
      <div className="container my-3">
        <div className="text-center mb-2">
          <h1>My Notes</h1>
        </div>
        {notes.length===0 && "No Notes"}
        {notes.map((note)=>{
            return <Noteitem key={note._id} note={note}/>
        })}
        
        {/* <table class="table table-light table-responsive">
          <thead>
            <tr className="table bg-dark text-light">
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Tags</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => {
              return (
                <tr>
                  <th scope="row">1</th>
                  <td>{note.title}</td>
                  <td>{note.tag}</td>
                  <td>{note.description.slice(0, 10)}...</td>
                  <td>
                    <a href={`/View/Note/${note._id}`}>
                      <span className="badge bg-info mx-2 py-2">View</span>
                    </a>
                    <a href={`/Edit/Note/${note._id}`}>
                      <span className="badge bg-warning mx-2 py-2">Edit</span>
                    </a>
                    <a href={`/Delete/Note/${note._id}`}>
                      <span className="badge bg-danger py-2">Delete</span>
                    </a>
                  </td>
                </tr>
              );
            })}
           
          </tbody>
        </table> */}
      </div>
    </div>
  );
};
export default MyNotes;
