import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom"
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/", {
        email,
        password,
      });
  
      if (response.data === "Success") {
        navigate("/book", { state: { id: email } });
      } else if (response.data === "Incorrect Password") {
        alert("Incorrect password");
      } else if (response.data === "User not found") {
        alert("User not found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div
      className="Login centered text-white"
      style={{ flexDirection: "column" }}
    >
      <h1 className="display-4 mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="btn" type="submit">
          Submit
        </button>
        <p className="lead">or</p>
        <Link to="/signup" className="btn">Create Account</Link>
      </form>
    </div>
  );
}
