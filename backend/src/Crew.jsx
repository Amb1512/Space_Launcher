import { useEffect, useState } from "react";

export default function Crew() {
  const [crew, setCrew] = useState([]);

  useEffect(() => {
  const token = res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax"
});

  if (!token) {
    window.location.href = "/login";
  }
}, []);

  return (
    <div>
      <h1>Crew Members</h1>

      {crew.map((member, index) => (
        <div key={index}>
          <h3>{member.name}</h3>
          <p>{member.designation}</p>
        </div>
      ))}
    </div>
  );
}