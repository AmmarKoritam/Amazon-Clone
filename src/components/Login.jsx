// Library
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import logo from "../image/login-logo.png";

import "./login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSignIn(e) {
    e.preventDefault();

    if (!email && !password) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.error("SignIn error:", err.message);
    }
  }

  async function handleCreateAccount(e) {
    e.preventDefault();

    if (!email && !password) return;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err.message);
    }
  }

  return (
    <div className="login">
      <Link to="/">
        <img className="login-logo" src={logo} alt="website logo" />
      </Link>

      <div className="login-container">
        <h1>Sign in</h1>
        <form>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="login-signInBtn"
            type="submit"
            onClick={handleSignIn}
          >
            sign in
          </button>

          <p>
            By continuing, you agree to Amazon's Conditions of Use and Privacy
            Notice.
          </p>

          <button className="login-registerBtn" onClick={handleCreateAccount}>
            Create your Amazon Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
