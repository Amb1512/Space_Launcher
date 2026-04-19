import { useState, useEffect } from "react";

const CSS = `@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;600;700;800&family=Barlow:wght@300;400;500&family=Share+Tech+Mono&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --blue: #0b3d91;
  --red: #fc3d21;
  --accent: #4eb3e8;
  --green: #3ddc97;
  --dark: #0a0c10;
  --dark-blue: #07234f;
  --panel: #111827;
  --white: #ffffff;
  --off: #f0f2f5;
  --lgray: #d8dce3;
  --mgray: #8a92a0;
  --display: 'Barlow Condensed', sans-serif;
  --body: 'Barlow', sans-serif;
  --mono: 'Share Tech Mono', monospace;
}

body, #root {
  background: var(--dark);
  color: var(--white);
  font-family: var(--body);
  overflow-x: hidden;
  min-height: 100vh;
}

/* ⭐ STAR BACKGROUND */
.starfield {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  animation: twinkle 3s infinite;
}
@keyframes twinkle {
  0%,100% { opacity: 0.2; }
  50% { opacity: 1; }
}

/* ⭐ WRAPPER */
.signup-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
  position: relative;
}

/* ⭐ BACKGROUND */
.signup-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 30% 50%, rgba(11,61,145,.3), transparent),
    radial-gradient(circle at 70% 60%, rgba(7,35,79,.5), transparent);
}

.signup-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(78,179,232,.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(78,179,232,.05) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* ⭐ PLANET */
.planet-orb {
  position: absolute;
  right: -100px;
  top: 50%;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, #2563a8, #0b3d91);
  opacity: 0.4;
}

/* ⭐ CARD */
.signup-container {
  width: 100%;
  max-width: 500px;
  background: rgba(17, 24, 39, 0.7);
  backdrop-filter: blur(15px);
  padding: 2.5rem;
  border: 1px solid rgba(78,179,232,.2);
}

/* ⭐ HEADER */
.signup-title {
  font-family: var(--display);
  font-size: 2rem;
  margin-bottom: 10px;
}

.signup-subtitle {
  color: var(--lgray);
  margin-bottom: 20px;
}

/* ⭐ FORM */
.signup-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-row {
  display: flex;
  gap: 10px;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 12px;
  margin-bottom: 5px;
}

.form-input {
  padding: 10px;
  background: rgba(11,61,145,.1);
  border: 1px solid rgba(78,179,232,.2);
  color: white;
}

.form-input:focus {
  border-color: var(--accent);
  outline: none;
}

/* ⭐ BUTTON */
.btn-submit {
  background: var(--blue);
  padding: 12px;
  border: none;
  color: white;
  cursor: pointer;
  margin-top: 10px;
}

.btn-submit:hover {
  background: #1253c4;
}`

function StarField() {
  const stars = Array.from({ length: 150 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
  }));

  return (
    <div className="starfield">
      {stars.map(s => (
        <div key={s.id} className="star" style={{ left: s.left, top: s.top }} />
      ))}
    </div>
  );
}

function SignUpForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup-container">

      <div className="signup-header">
        <div className="signup-tag">◆ ASTRONAUT REGISTRATION</div>
        <h1 className="signup-title">JOIN THE MISSION</h1>
        <p className="signup-subtitle">
          Create your account to access classified mission data.
        </p>
      </div>

      <form className="signup-form">
        
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">First Name *</label>
            <input name="firstName" className="form-input" onChange={handleChange}/>
          </div>

          <div className="form-group">
            <label className="form-label">Last Name *</label>
            <input name="lastName" className="form-input" onChange={handleChange}/>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Email *</label>
          <input name="email" className="form-input" onChange={handleChange}/>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Password *</label>
            <input type="password" name="password" className="form-input" onChange={handleChange}/>
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password *</label>
            <input type="password" name="confirmPassword" className="form-input" onChange={handleChange}/>
          </div>
        </div>

        <button className="btn-submit">Create Account</button>

      </form>
    </div>
  );
}

function Nav() {
  return (
    <nav className="nav">
      <div className="nav-logo">
        <div className="meatball">NASA</div>
        <span className="mission-id">NEBULA CORE</span>
      </div>

      <ul className="nav-links">
        <li><a href="/">Overview</a></li>
        <li><a href="/">Launch</a></li>
        <li><a href="/">Crew</a></li>
        <li><a href="/">Mission Log</a></li>
        <li><a href="/login">Login</a></li>
      </ul>

      <div className="nav-status">
        <div className="status-dot" />
        MISSION NOMINAL
      </div>
    </nav>
  );
}

export default function Signup() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

    return (
  <>
    <Nav />

    <div className="signup-wrapper">
      <div className="signup-bg" />
      <div className="signup-grid" />
      <div className="planet-orb" />

      <StarField />
      <SignUpForm />
    </div>
  </>
);
}