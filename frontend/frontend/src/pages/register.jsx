import React from "react";
import { useState } from "react";
import { registerUser } from "../services/authApi";
import "./register.css"
import { useNavigate } from "react-router-dom";

const Register = () => {
   
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [name, setname] = useState("")
    const [role, setrole] = useState("")
     const navigate = useNavigate();
    const submit=async() => {
        try{
            const res= await registerUser({email,password,name,role})
            console.log(res.data);
            alert("registereddd")
             navigate("/");
            
        }

     catch (err) {
console.log(err);
  console.log(err.response?.data);
  console.log(err.response?.status);
  alert("Register failed");
 
}
        
    }
  return (
    <div className="rego">
        <div className="rego-card">
<input
placeholder="email"
onChange={(e)=>setemail(e.target.value)}

/>
   <input
       placeholder='password'
       onChange={(e)=>setpassword(e.target.value)}
       />
          <input
       placeholder='name'
       onChange={(e)=>setname(e.target.value)}
       />
          <input
       placeholder='role'
       onChange={(e)=>setrole(e.target.value)}
       />
       <button onClick={submit}>Register</button>
    </div>
      </div>
  )
}

export default Register