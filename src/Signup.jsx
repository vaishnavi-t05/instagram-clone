import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const valid = email.trim().length > 0 && password.length >= 6 && !loading;

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    const value = email.trim();
    if (!value.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, value, password);
      setSuccess(true);
      setLoading(false);
      setTimeout(() => navigate("/home"), 1500);
      return;
    } catch (err) {
      console.log(err);
      setError("Couldn't create your account. This email may already be in use.");
    } finally {
      if (!success) setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <img
          src="/assets/instagram-images.png"
          alt="Instagram"
          className="signup-logo"
        />
        <h2 className="signup-sub">
          Sign up to see photos and videos from your friends.
        </h2>

        <form onSubmit={handleSignup} className="signup-form">
          <input
            type="text"
            placeholder="Mobile number or email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />

          {error && <p className="signup-error">{error}</p>}

          <p className="signup-terms">
            By signing up, you agree to our{" "}
            <span>Terms</span>, <span>Privacy Policy</span> and{" "}
            <span>Cookies Policy</span>.
          </p>

          <button type="submit" className="signup-btn" disabled={!valid}>
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>
      </div>

      <div className="signup-box signup-login">
        Have an account? <Link to="/login">Log in</Link>
      </div>

      {success && (
        <div className="signup-popup-overlay">
          <div className="signup-popup">
            <div className="signup-popup-check">✓</div>
            <h3>Signup successful!</h3>
            <p>Welcome to Instagram 🎉</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
