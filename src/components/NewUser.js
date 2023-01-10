import React,{useState} from 'react'


export const NewUser = (props) => {
    const [newUser, setnewUser] = useState({name:"", email: "", password: "" });
    const apiURL = "http://localhost:5000/api/auth";
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      //getting all ntoes
      
        const response = await fetch(`${apiURL}/CreateUser`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({name:newUser.name, email: newUser.email, password: newUser.password }),
        });
        const json = await response.json();
       // console.log(json);
        if (json.Success) {
          localStorage.setItem('_insPid',json.auth_token)
         
          //var err = json.Error_Message
          props.alert("User Added Successfully","Hurray ","success")
        } else {
       
          var err = json.Error_Message
          props.alert(err,"Oops ","danger")
        }
      
    };
    const onChange = (e) => {
        setnewUser({ ...newUser, [e.target.name]: e.target.value });
    };
  return (
    <div>
        <div className="container  col-6 my-3">
        <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-12">
    <label htmlFor="inputAddress" className="form-label">Name</label>
    <input value={newUser.name} name="name" onChange={onChange} type="text" className="form-control" id="inputAddress" placeholder="Name"/>
  </div>
  <div className="col-md-6">
    <label htmlFor="inputEmail4" className="form-label">Email</label>
    <input  value={newUser.email} name="email" onChange={onChange}  type="email" className="form-control" id="inputEmail4"/>
  </div>
  <div className="col-md-6">
    <label htmlFor="inputPassword4" className="form-label">Password</label>
    <input  value={newUser.password} name="password" onChange={onChange}   type="password" className="form-control" id="inputPassword4"/>
    <div id="passwordHelpBlock" className="form-text">
  Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
</div> 
  </div>     
  <div className="col-12">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id="gridCheck"/>
      <label className="form-check-label" htmlFor="gridCheck">
        Check me out
      </label>
    </div>
  </div>
  <div className="col-12">
    <button type="submit" className="btn btn-primary">Sign in</button>
  </div>
</form>
        </div>
    </div>
  )
}
