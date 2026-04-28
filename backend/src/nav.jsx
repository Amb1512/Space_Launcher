import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-logo">
        <div className="meatball">NASA</div>
        <span className="mission-id">NEBULA CORE</span>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Overview</Link></li>
        <li><Link to="/launch">Launch</Link></li>
        <li><Link to="/crew">Crew</Link></li>
        <li><Link to="/missionlog">Mission Log</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </ul>

      <div className="nav-status">
        <div className="status-dot"></div>
        MISSION NOMINAL
      </div>
    </nav>
  );
}