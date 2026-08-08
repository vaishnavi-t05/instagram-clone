import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      alert("Account Created Successfully!");

      navigate("/home");

    } catch (error) {
      alert(error.code);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>

      <h2 className="text-center mb-4">Instagram Sign Up</h2>

      <form onSubmit={handleSignup}>

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-primary w-100" type="submit">
          Sign Up
        </button>

      </form>

      <p className="text-center mt-3">
        Already have an account?{" "}
        <Link to="/">Login</Link>
      </p>

    </div>
  );
};

export default Signup;