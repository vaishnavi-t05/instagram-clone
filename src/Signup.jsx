import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      alert("Signup successful!");

      // Go to Login after signup
      navigate("/login");

    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>

      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          Sign Up
        </button>
      </form>

      <p onClick={() => navigate("/login")}>
        Already have an account? Login
      </p>
    </div>
  );
};

export default Signup;