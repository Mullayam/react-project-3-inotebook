import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
 // let location=useLocation;
 const handleLogout = ()=>{
  localStorage.removeItem('_insPid'); 
 }
 
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-light">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">iNotebook</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link  className="nav-link" aria-current="page" to="/">Home</Link>
          </li>
          
          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Notes
            </Link>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="/New/Note">New Note</Link></li>
              <li><hr className="dropdown-divider"/></li>
              <li><Link className="dropdown-item" to="/MyNotes/Show/All">My Notes</Link></li>
              
            </ul>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">About</Link>
          </li>
        </ul>
        {!localStorage.getItem('_insPid')?<Link to="/Login"  className="btn btn-outline-primary" >Login</Link>
       :<Link to="/Logout" onClick={handleLogout}  className="btn btn-outline-danger" >Logout</Link>
      }
       
      </div>
    </div>
  </nav>
  </div>
  )
}
