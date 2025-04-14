import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Auth.css";
import {register} from "../endpoints/api.js"
import Header from "./Header.js";
import Footer from "./Footer.js";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const formData = new FormData();
    formData.append("username", name);
    formData.append("email", email);
    formData.append("password", password);
    try {
      const response = await register(formData);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError("");
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
    <Header/>
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create an Account</h2>
          <p>Join the StudentConnect community</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">UserName</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your user name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>
          <button type="submit" className="auth-button">
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Register;