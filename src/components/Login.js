import React, { useState } from "react";
import { Link  } from "react-router-dom";

export const Login = (props) => {
  
  const [login, setlogin] = useState({ email: "", password: "" });
  const apiURL = "http://localhost:5000/api/auth";

  const handleSubmit = async (e) => {
    e.preventDefault();
    //getting all ntoes
    
      const response = await fetch(`${apiURL}/Login`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: login.email, password: login.password }),
      });
      const json = await response.json();
     // console.log(json);
      if (json.Success) {
        localStorage.setItem('_insPid',json.auth_token)      
        props.alert("Login Successfull","Please Wait... ","success")
      } else {
       var err = json.Error_Message
        props.alert(err,"Oops ","danger")
      }
    
  };
  const onChange = (e) => {
    setlogin({ ...login, [e.target.name]: e.target.value });
  };
  return (
    <div id="show">
      <div className="container col-lg-8 col-md-6 my-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              onChange={onChange}
              value={login.email}
              type="email"
              className="form-control"
              name="email"
              id="exampleInputEmail1"
               
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword5" className="form-label">
              Password
            </label>
            <input
              name="password"
              onChange={onChange}
              value={login.password}
              type="password"
              id="inputPassword5"
              className="form-control"
              
            />
          </div>
          <button type="submit" className="btn col-12 btn-primary">
            Submit
          </button>
        </form>
        <div className="row my-2">
          <Link className="btn btn-block btn-outline-success" to="/NewHere">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};
