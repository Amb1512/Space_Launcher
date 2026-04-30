
import { useState } from "react";
import "./App.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("Login error");
    }
  };

  return (
    <div className="auth-card">

      <div className="hero-tag">◆ MISSION CONTROL ACCESS</div>

      <h1 className="auth-title">SECURE LOGIN</h1>

      <p className="auth-sub">
        Enter your credentials to access classified mission data
        <br />
        and control systems.
      </p>

      <form className="login-form" onSubmit={handleLogin}>

        <label>Email Address</label>
        <input
          type="email"
          placeholder="astronaut@nasa.gov"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="login-row">
          <label className="remember">
            <input type="checkbox" />
            Remember me
          </label>

          <a href="#">Forgot password?</a>
        </div>


        <button type="submit" className="login-btn">
          ACCESS MISSION CONTROL
        </button>

        <button
          type="button"
          className="login-btn google-btn"
          style={{ marginTop: 12, background: "#fff", color: "#222", border: "1px solid #ccc" }}
          onClick={() => {
            window.location.href = "http://localhost:5000/auth/google";
          }}
        >
          Sign in with Google
        </button>

      </form>
    </div>
  );
}