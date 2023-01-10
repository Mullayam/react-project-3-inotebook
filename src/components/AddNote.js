import React,{useState,useContext} from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
    const context = useContext(noteContext)
    const {addNote}=context
    const [note, setNote] = useState({tittle:"",description:"",tag:"Personal"})
    
    const addNewNote = (e)=>{
        e.preventDefault();
            addNote(note.tittle,note.description,note.tag);
            setNote({tittle:"",description:"",tag:""})
            props.alert("Note Added Successfully","Done ","info");
       
        }
    const onChange = (e)=>{
           setNote({...note, [e.target.name]:e.target.value}) 
    }
  return (
    <div>
      <div className="container my-3 bg-light">
        <form method="POST" action="" className="px-2 py-3 col-lg-6">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
            name="tittle"
              type="text"
              value={note.title}
              onChange={onChange}
              className="form-control"
              id="title"
            />
            <div id="noteHelp" className="form-text">
              We'll never share your Notes with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Description
            </label>
            <textarea
            name="description"
            value={note.title}
            onChange={onChange}
            className="form-control"
              id="fcdesc"
              rows="3"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Tag
            </label>
            <input
            name="tag"
              type="text"
              value={note.tag}
              onChange={onChange}
              className="form-control"
              id="tag"
            />
            <div id="noteHelp" className="form-text">
           <code><b>Personal</b> </code>will be Default Tag
          </div>
            
          </div>
          <button type="submit" onClick={addNewNote} className="btn btn-primary">
            Add New Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
