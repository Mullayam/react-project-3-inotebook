import React,{useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import MyNotes from "./components/MyNotes";
//simport Noteitem from "./components/Noteitem";
import AddNote from "./components/AddNote";
import { Login } from "./components/Login";
import { NewUser } from "./components/NewUser";
import Alert from "./components/Alert";

function App() {
  const [alert, setalert] = useState(null)
  const showAlert =(msg,hd,type)=>{
  setalert({
    message:msg,
    type:type,
    heading:hd
  })
 setTimeout(()=>{
setalert(null)
 },2000)
  }
  return (
    <>
    <NoteState>
      <BrowserRouter>
      <Navbar />
      <Alert alert={alert}></Alert>
        <Routes>
        
            <Route exact index path="/" element={<Home />} />
            <Route exact path="/about"  element={<About />} />
            <Route exact path="/MyNotes/Show/All"  element={<MyNotes />} />
            <Route exact path="/New/Note"  element={<AddNote  alert={showAlert}/>} />
            <Route exact path="/Login"  element={<Login alert={showAlert}/>} />
            <Route exact path="/NewHere"  element={<NewUser alert={showAlert} />} />
            {/* <Route exact path="/View/Note/:id">
                <Home />
                <Noteitem note={} />
            </Route>
           */}
          
          
        
            
            
        </Routes>
      </BrowserRouter>    
      </NoteState>
    </>
  );
}

export default App;
