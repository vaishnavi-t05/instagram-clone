import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const InstagramGlyph = () => (
  <svg viewBox="0 0 48 48" className="ig-glyph" aria-hidden="true">
    <defs>
      <linearGradient id="igGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFD600" />
        <stop offset="35%" stopColor="#FF7A00" />
        <stop offset="60%" stopColor="#FF0069" />
        <stop offset="85%" stopColor="#D300C5" />
        <stop offset="100%" stopColor="#7638FA" />
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="42" height="42" rx="12" fill="none" stroke="url(#igGrad)" strokeWidth="4" />
    <circle cx="24" cy="24" r="10" fill="none" stroke="url(#igGrad)" strokeWidth="4" />
    <circle cx="34.5" cy="13.5" r="3" fill="url(#igGrad)" />
  </svg>
);

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const canSubmit = identifier.trim().length > 0 && password.length > 0 && !loading;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const value = identifier.trim();

    // Firebase email/password auth needs an email.
    // Accept email directly; otherwise show helpful message.
    if (!value.includes("@")) {
      setError("For this demo, please log in with your email address.");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, value, password);
      setShowSuccess(true);
      setLoading(false);
      setTimeout(() => navigate("/home"), 1500);
      return;
    } catch (err) {
      console.log(err);
      setError("Sorry, your password was incorrect or this account doesn't exist.");
    } finally {
      if (!showSuccess) setLoading(false);
    }
  };

  return (
    <div className="ig-login-page">
      {/* LEFT PROMO */}
      <section className="ig-hero">
        <div className="ig-hero-inner">
          <InstagramGlyph />
          <h1 className="ig-headline">
            See everyday moments from your
            <span className="ig-gradient-text"> close friends.</span>
          </h1>

          <div className="ig-collage">
            <div className="ig-card ig-card-left">
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80&auto=format&fit=crop"
                alt="friend"
              />
              <span className="ig-heart">❤</span>
              <div className="ig-pill ig-pill-bottom" />
            </div>

            <div className="ig-card ig-card-center">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80&auto=format&fit=crop"
                alt="close friends"
              />
              <span className="ig-reaction">🔮👀🍔</span>
              <div className="ig-pill-row">
                <div className="ig-pill ig-pill-long" />
                <span className="ig-mini-heart">♡</span>
              </div>
            </div>

            <div className="ig-card ig-card-right">
              <img
                src="https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=400&q=80&auto=format&fit=crop"
                alt="friends outdoors"
              />
              <span className="ig-star">★ ⌄</span>
              <span className="ig-avatar-ring">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&auto=format&fit=crop"
                  alt="story avatar"
                />
              </span>
              <div className="ig-icon-row">
                <div className="ig-pill ig-pill-small" />
                <span className="ig-mini-heart">♡</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT FORM */}
      <section className="ig-form-side">
        <div className="ig-form-wrap">
          <h2 className="ig-login-title">Log into Instagram</h2>

          <form onSubmit={handleLogin} className="ig-form">
            <label className={`ig-field ${identifier ? "filled" : ""}`}>
              <span className="ig-floating">Mobile number, username or email</span>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                autoComplete="username"
              />
            </label>

            <label className={`ig-field ${password ? "filled" : ""}`}>
              <span className="ig-floating">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </label>

            {error && <p className="ig-error">{error}</p>}

            <button type="submit" className="ig-btn-primary" disabled={!canSubmit}>
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <button className="ig-link" type="button">
            Forgot password?
          </button>

          <div className="ig-spacer" />

          <button className="ig-btn-fb" type="button">
            <svg viewBox="0 0 24 24" className="fb-icon" aria-hidden="true">
              <path
                fill="#0095F6"
                d="M24 12a12 12 0 1 0-13.9 11.9v-8.4h-3V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 1-2 1.9V12h3.3l-.5 3.5h-2.8v8.4A12 12 0 0 0 24 12Z"
              />
            </svg>
            Log in with Facebook
          </button>

          <Link to="/signup" className="ig-btn-outline">
            Create new account
          </Link>

          <div className="ig-meta">﹏ Meta</div>
        </div>
      </section>

      {showSuccess && (
        <div className="ig-popup-overlay">
          <div className="ig-popup">
            <div className="ig-popup-check">✓</div>
            <h3>Login successful!</h3>
            <p>Welcome back 🎉</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
