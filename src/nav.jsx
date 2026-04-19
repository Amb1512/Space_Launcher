export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-logo">
        <div className="meatball">NASA</div>
        <span className="mission-id">NEBULA CORE</span>
      </div>

      <ul className="nav-links">
        <li><a href="/">Overview</a></li>
        <li><a href="/#launch">Launch</a></li>
        <li><a href="/#crew">Crew</a></li>
        <li><a href="/#mission-log">Mission Log</a></li>
        <li><a href="/login">Login</a></li>
      </ul>

      <div className="nav-status">
        <div className="status-dot" />
        MISSION NOMINAL
      </div>
    </nav>
  );
}