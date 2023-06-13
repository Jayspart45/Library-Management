import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password
    if (password.length < 6) {
      alert("Password should be at least 6 characters ");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/signup", {
        email,
        password,
      });

      if (response.data === "Exists") {
        alert("User already exists");
      } else if (response.data === "Not Exists") {
        navigate("/book", { state: { id: email } });
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
      <h1 className="display-4">Sign Up</h1>
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
        <Link to="/" className="btn">
          Login
        </Link>
      </form>
    </div>
  );
}
