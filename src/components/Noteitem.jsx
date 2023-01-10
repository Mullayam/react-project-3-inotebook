import React,{useContext,useState} from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote,editNote } = context;
  const { note } = props;
  const [notes, setNotes] = useState({etittle:"",edescription:"",etag:""})
    const updateNote=(e)=>{
      e.preventDefault()
      editNote(note._id,notes.etittle,notes.edescription,notes.etag);
    }
    
  const onChange = (e)=>{
    setNotes({...notes, [e.target.name]:e.target.value}) 
}
  return (
    <div>
       

      <div className="card my-2 mx-2">
        <div className="card-body">
          <div className="d-flex">
            <h5 className="card-title flex-fill">{note.title}</h5>
            <a href="/New/Note" className="card-link bg-danger px-2 py-2 rounded">
              <i className="fas fa-add"></i>
            </a>
            <a href={`#EditNote${note._id}`}  data-bs-toggle="modal" data-bs-target={`#EditNote${note._id}`}  className="card-link bg-warning px-2 py-2 rounded">
              <i className="fas fa-edit"></i>
            </a>
            <a  className="card-link bg-danger px-2 py-2 rounded">
              <i onClick={()=>{deleteNote(note._id);props.alert("Note Deleted Successfully","Done ","warning")}}  className="fas fa-trash-alt"></i>
            </a>
          </div>

          <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
      <div className="modal fade" id={`EditNote${note._id}`}   aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id={`EditNote${note._id}`} >Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form method="POST" action="" className="px-2 py-3 col-lg-6">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
            name="etittle"
            value={note.title}
              type="text"
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
            name="edescription"
            onChange={onChange}
            value={note.description}
            className="form-control"
              id="fcdesc"
              rows="3"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Tags
            </label>
            <input
            name="etag"
            value={note.tag}
              type="text"
              onChange={onChange}
              className="form-control"
              id="tag"
            />
            </div>
          <button type="submit" onClick={updateNote} className="btn btn-primary">
            Update Note
          </button>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default Noteitem;
