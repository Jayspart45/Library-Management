import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Alert from "../FeatureComponent/Alert"; // Import the custom Alert component

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null); // Add state for the alert
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!validateEmail(email)) {
      setAlert({ type: "danger", message: "Invalid email address" });
      return;
    }

    // Validate password
    if (password.length < 6) {
      setAlert({ type: "danger", message: "Password should be at least 6 characters" });
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/signup", {
        email,
        password,
      });

      if (response.data === "Exists") {
        setAlert({ type: "danger", message: "User already exists" });
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
      <h1 className="display-4 mb-4">Sign Up</h1>
      {alert && <Alert type={alert.type} title={alert.message} />} {/* Render the alert component if the alert state is not null */}
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
        <Link
          to="/"
          className="text-white"
          style={{ textDecoration: "none" }}
        >
          Login
        </Link>
      </form>
    </div>
  );
}
