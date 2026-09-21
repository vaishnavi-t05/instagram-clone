import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import "./SwitchAccount.css";

const SwitchAccount = ({ onClose }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const value = identifier.trim();
    if (!value.includes("@")) {
      setError("Please enter your email address.");
      return;
    }
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, value, password);
      onClose();
      window.location.reload();
    } catch (err) {
      console.log(err);
      setError("Sorry, your password was incorrect or this account doesn't exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="switch-overlay" onClick={onClose}>
      <div className="switch-card" onClick={(e) => e.stopPropagation()}>
        <button className="switch-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <img
          src="/assets/instagram-images.png"
          alt="Instagram"
          className="switch-logo"
        />

        <form onSubmit={handleLogin} className="switch-form">
          <input
            type="text"
            placeholder="Phone number, username, or email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          {error && <p className="switch-error">{error}</p>}

          <label className="switch-save">
            <input
              type="checkbox"
              checked={saveInfo}
              onChange={(e) => setSaveInfo(e.target.checked)}
            />
            Save login info
          </label>

          <button type="submit" className="switch-login" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <button className="switch-forgot" type="button">
          Forgot password?
        </button>
      </div>
    </div>
  );
};

export default SwitchAccount;
