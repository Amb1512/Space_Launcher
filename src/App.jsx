import { useState, useEffect, useRef, useMemo } from "react";
import "./App.css";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const LAUNCH_DATE = new Date(Date.now() + 45 * 24 * 60 * 60 * 1000);

const CREW = [
  { initials: "RV", name: "Col. Rachel Vasquez", agency: "NASA — JSC Houston", role: "Commander", flag: "🇺🇸", missions: 3, days: 412, color: "#0b3d91" },
  { initials: "JK", name: "Cmdr. James Kim",    agency: "NASA — JSC Houston", role: "Pilot",      flag: "🇺🇸", missions: 2, days: 198, color: "#1a0a4a" },
  { initials: "SN", name: "Dr. Sarah Nakamura", agency: "ESA — EAC Cologne",  role: "Mission Specialist", flag: "🇬🇧", missions: 1, days: 186, color: "#0a2a12" },
  { initials: "OM", name: "Dr. Omar Mensah",    agency: "CSA — Saint-Hubert", role: "Payload Specialist", flag: "🇨🇦", missions: 2, days: 241, color: "#2a1005" },
];

const LOG_ENTRIES = [
  { type: "milestone", met: "MET 14+06:22", date: "Feb 14, 2026", title: "LUNA-BASE Alpha Habitat Module Successfully Deployed", body: "The inflatable habitat module was successfully deployed on the Shackleton Crater rim at 89.9°S, 0.1°E. All structural integrity checks nominal. CO₂ scrubbers and life support systems fully operational. This marks the first permanent human habitat on the lunar surface.", author: "FLIGHT DIRECTOR M. OKONKWO" },
  { type: "nominal",   met: "MET 12+14:07", date: "Feb 12, 2026", title: "Lunar Surface EVA-2 Complete — Geological Samples Collected", body: "Commander Vasquez and Dr. Mensah completed a 7h 14m extravehicular activity, collecting 18.4 kg of regolith and core samples from six designated sites around the crater perimeter. All samples secured in sterile containment units aboard Orion.", author: "EVA FLIGHT CONTROLLER T. HARRISON" },
  { type: "critical",  met: "MET 10+03:41", date: "Feb 10, 2026", title: "PLSS Malfunction — EVA-2 Delayed by 18 Hours", body: "Dr. Nakamura's Portable Life Support System reported a pressure anomaly in the primary O₂ regulator during pre-EVA checkout. Mission Control scrubbed EVA-2 and activated the backup PLSS unit. Engineering team cleared the backup unit for use. No crew risk. Timeline adjusted.", author: "SPACECRAFT SYSTEMS ENGINEER A. PATEL" },
  { type: "milestone", met: "MET 08+22:15", date: "Feb 9, 2026",  title: "Artemis VII Touches Down — Lunar South Pole Landing Confirmed", body: "At 22:15 UTC, Orion and the Human Landing System successfully touched down at the designated south polar site. Commander Vasquez confirmed: \"Houston, Artemis is home.\" All crew are in excellent health and high spirits.", author: "CAPCOM L. CHEN" },
  { type: "nominal",   met: "MET 03+11:58", date: "Feb 4, 2026",  title: "Trans-Lunar Injection Burn Complete — En Route to the Moon", body: "The SLS core stage upper engine completed a successful 6-minute TLI burn, placing Artemis VII on a free-return trajectory to the Moon. Orion systems are nominal across all 47 monitored subsystems. Estimated lunar orbit insertion in 3 days, 11 hours.", author: "GUIDANCE OFFICER P. RODRIGUEZ" },
];



/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
function pad(n) { return String(n).padStart(2, "0"); }
function formatLaunchDate(d) {
  const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  return `${pad(d.getDate())} ${months[d.getMonth()]} ${d.getFullYear()} · ${pad(d.getHours())}:${pad(d.getMinutes())} UTC`;
}

/* ─────────────────────────────────────────────
   SUBCOMPONENTS
───────────────────────────────────────────── */
function StarField() {
  const stars = useMemo(() => (
    Array.from({ length: 220 }, (_, i) => {
      const size = Math.random() < 0.1 ? Math.random() * 2 + 1.5 : Math.random() * 1.2 + 0.3;
      return {
        id: i, size,
        left: `${Math.random() * 100}%`,
        top:  `${Math.random() * 100}%`,
        dur:  `${2 + Math.random() * 4}s`,
        delay:`${-Math.random() * 6}s`,
        minOp: 0.05 + Math.random() * 0.2,
        maxOp: 0.5  + Math.random() * 0.5,
      };
    })
  ), []);
  return (
    <div className="starfield">
      {stars.map(s => (
        <div key={s.id} className="star" style={{
          width: s.size, height: s.size,
          left: s.left, top: s.top,
          "--dur": s.dur, "--delay": s.delay,
          "--min-op": s.minOp, "--max-op": s.maxOp,
        }} />
      ))}
    </div>
  );
}

function Nav() {
  return (
    <nav className="nav">
      <div className="nav-logo">
        <div className="meatball">NASA</div>
        <span className="mission-id">NEBULA&thinsp;CORE</span>
      </div>
      <ul className="nav-links">
        <li><a href="#hero">Overview</a></li>
        <li><a href="#countdown">Launch</a></li>
        <li><a href="#crew">Crew</a></li>
        <li><a href="#log">Mission Log</a></li>
      </ul>
      <div className="nav-status">
        <div className="status-dot" />
        MISSION NOMINAL
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg" />
      <div className="hero-grid" />
      <div className="earth-orb" />
      <div className="hero-content">
        <div className="hero-tag">◆&nbsp;&nbsp;ACTIVE MISSION — LUNAR SURFACE OPERATIONS</div>
        <p className="hero-sub">National Aeronautics and Space Administration</p>
        <h1 className="hero-h1">
          NEBULA<span>CORE</span>
        </h1>
        <p className="hero-desc">
          Returning humanity to the lunar surface for the first time since Apollo 17. Mission objectives include establishing permanent surface infrastructure, conducting geological surveys of the Shackleton Crater rim, and deploying the LUNA-BASE Alpha habitat module.
        </p>
        <div className="hero-stats">
          <div className="stat"><div className="stat-lbl">Destination</div><div className="stat-val">Lunar South Pole</div></div>
          <div className="stat"><div className="stat-lbl">Mission Duration</div><div className="stat-val">30 Days</div></div>
          <div className="stat"><div className="stat-lbl">Crew Aboard</div><div className="stat-val">4 Astronauts</div></div>
        </div>
        <div className="hero-cta">
          <a href="#countdown" className="btn-primary">Launch Countdown</a>
          <a href="#log" className="btn-ghost">Mission Log</a>
        </div>
      </div>
      <div className="scroll-hint">
        <div className="scroll-line" />
        SCROLL
      </div>
    </section>
  );
}

function Countdown() {
  const [launch, setLaunch] = useState(LAUNCH_DATE);
  const [time, setTime] = useState({ days: 0, hrs: 0, min: 0, sec: 0 });
  const [currentTime, setCurrentTime] = useState("");

  // ⏱ Countdown logic (UNCHANGED)
  useEffect(() => {
    const tick = () => {
      const diff = launch - Date.now();
      if (diff <= 0) {
        setTime({ days: 0, hrs: 0, min: 0, sec: 0 });
        return;
      }
      setTime({
        days: Math.floor(diff / 86400000),
        hrs: Math.floor((diff % 86400000) / 3600000),
        min: Math.floor((diff % 3600000) / 60000),
        sec: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [launch]);

  // 🌍 LIVE UTC TIME (NEW)
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

      const timeStr =
        `${String(now.getDate()).padStart(2, "0")} ` +
        `${months[now.getMonth()]} ` +
        `${now.getFullYear()} · ` +
        `${String(now.getHours()).padStart(2, "0")}:` +
        `${String(now.getMinutes()).padStart(2, "0")}:` +
        `${String(now.getSeconds()).padStart(2, "0")} UTC`;

      setCurrentTime(timeStr);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="countdown-section" id="countdown">

      {/* Launch time picker (UNCHANGED) */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          className="launch-picker"
          type="datetime-local"
          value={launch.toISOString().slice(0,16)}
          onChange={(e) => {
            const selected = new Date(e.target.value);
            if (selected > new Date()) {
              setLaunch(selected);
            }
          }}
        />

      </div>

      <div className="section-header">
        <div className="section-lbl">T-Minus</div>
        <h2 className="section-title">Launch Countdown</h2>
      </div>

      {/* 🕒 LIVE UTC DISPLAY */}
      <div className="current-time-wrap">
        <div className="current-time">
          {currentTime || "LOADING..."}
        </div>
      </div>

      <div className="countdown-row">
        <div className="count-block">
          <div className="count-num">{pad(time.days)}</div>
          <div className="count-unit">Days</div>
        </div>
        <div className="count-colon">:</div>
        <div className="count-block">
          <div className="count-num">{pad(time.hrs)}</div>
          <div className="count-unit">Hours</div>
        </div>
        <div className="count-colon">:</div>
        <div className="count-block">
          <div className="count-num">{pad(time.min)}</div>
          <div className="count-unit">Minutes</div>
        </div>
        <div className="count-colon">:</div>
        <div className="count-block">
          <div className="count-num">{pad(time.sec)}</div>
          <div className="count-unit">Seconds</div>
        </div>
      </div>

      <div className="launch-meta">
        <p className="launch-target">
          Launch Window: <span>{formatLaunchDate(launch)}</span>
        </p>
        <p className="launch-site">
          Kennedy Space Center · Launch Complex 39B · Orion SLS Block 2
        </p>
      </div>
    </section>
  );
}

function CrewCard({ member }) {
  return (
    <div className="crew-card">
      <div className="crew-avatar">
        <div className="avatar-bg" style={{ background: `linear-gradient(145deg, ${member.color} 0%, #050f2e 100%)` }} />
        <div className="avatar-initials">{member.initials}</div>
        <svg className="avatar-silhouette" viewBox="0 0 100 100" fill="none">
          <ellipse cx="50" cy="28" rx="14" ry="16" fill="rgba(255,255,255,0.12)" />
          <path d="M20 95 Q20 58 50 55 Q80 58 80 95" fill="rgba(255,255,255,0.12)" />
        </svg>
        <span className="crew-flag">{member.flag}</span>
        <div className="crew-role-badge">{member.role}</div>
      </div>
      <div className="crew-info">
        <div className="crew-name">{member.name}</div>
        <div className="crew-agency">{member.agency}</div>
        <div className="crew-stats-row">
          <div className="crew-stat"><span className="crew-stat-val">{member.missions}</span><span className="crew-stat-lbl">Missions</span></div>
          <div className="crew-stat"><span className="crew-stat-val">{member.days}</span><span className="crew-stat-lbl">Days in Space</span></div>
        </div>
      </div>
    </div>
  );
}

function Crew() {
  return (
    <section className="crew-section" id="crew">
      <div className="section-header">
        <div className="section-lbl">Flight Crew</div>
        <h2 className="section-title">Mission Specialists</h2>
      </div>
      <div className="crew-grid">
        {CREW.map(m => <CrewCard key={m.initials} member={m} />)}
      </div>
    </section>
  );
}

function LogEntry({ entry }) {
  return (
    <div className="log-entry">
      <div className="log-time">
        <span className="log-elapsed">{entry.met}</span>
        <span className="log-date">{entry.date}</span>
      </div>
      <div className="log-body-col">
        <div className={`log-dot ${entry.type}`} />
        <span className={`log-badge ${entry.type}`}>{entry.type}</span>
        <div className="log-entry-title">{entry.title}</div>
        <p className="log-entry-body">{entry.body}</p>
        <div className="log-author">◆ Filed by: {entry.author}</div>
      </div>
    </div>
  );
}

function MissionLog() {
  const [filter, setFilter] = useState("all");
  const visible = filter === "all" ? LOG_ENTRIES : LOG_ENTRIES.filter(e => e.type === filter);
  return (
    <section className="log-section" id="log">
      <div className="section-header">
        <div className="section-lbl">Real-Time Updates</div>
        <h2 className="section-title">Mission Log</h2>
      </div>
      <div className="log-container">
        <div className="log-filter">
          {["all","nominal","milestone","critical"].map(f => (
            <button key={f} className={`filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="log-timeline">
          {visible.map((e, i) => <LogEntry key={i} entry={e} />)}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-left">
        PROPRIETARY DATA — FOR AUTHORIZED PERSONNEL ONLY<br />
        © 2026 NATIONAL AERONAUTICS AND SPACE ADMINISTRATION
      </div>
      <div className="footer-center">ARTEMIS VII · NNX-2026-A7</div>
      <div className="footer-right">
        MISSION CONTROL CENTER<br />
        JOHNSON SPACE CENTER, TX
      </div>
    </footer>
  );
}

/* /* ─────────────────────────────────────────────
   APP
───────────────────────────────────────────── */
export default function App() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="space-page">
      <StarField />
      <Nav />
      <Hero />
      <Countdown />
      <div className="divider" />
      <Crew />
      <div className="divider" />
      <MissionLog />
      <Footer />
    </div>
  );
}
