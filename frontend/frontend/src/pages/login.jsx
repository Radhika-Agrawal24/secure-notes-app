import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { loginUser } from "../services/authApi";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const navigate = useNavigate();
  const submit=async() => {
        try{
            const res= await loginUser({email,password})
            console.log(res.data);
            alert("logged innn")
               navigate("/notes");
        }
       catch (err) {
      console.log(err);
      alert("Login failed");
    }}
  return (
    <div className="login-container">

      <div className="login-card">

        <h1>Welcome Back</h1>
        <p>Login to continue</p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={submit}>
          Login
        </button>

        <p className="register-text">
          New User?
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;