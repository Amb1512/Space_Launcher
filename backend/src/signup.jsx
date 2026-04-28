import { useState } from "react";
import "./App.css";
import Nav from "./nav.jsx";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agency: "",
    rank: "",
    termsAccepted: false,
    profilePic: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData({ ...formData, profilePic: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        agency: formData.agency,
        rank: formData.rank
      })
    });

    const data = await res.json();

    alert(data.message);

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agency: "",
      rank: "",
      termsAccepted: false,
      profilePic: null
    });

    setPreview(null);

  } catch (error) {
    alert("Signup Failed");
    console.log(error);
  }
};

  return (
    <>
      <Nav />

      <div className="login-screen">
        <div className="login-box-wrap">

          <div className="auth-card">

            <div className="hero-tag">◆ ASTRONAUT REGISTRATION</div>

            <h1 className="auth-title">JOIN THE MISSION</h1>

            <p className="auth-sub">
              Create your account to access classified mission data and
              participate in humanity's return to the lunar surface.
            </p>

            {/* PROFILE IMAGE */}
            <div className="profile-upload">
              <label htmlFor="profilePic">
                <img
                  src={
                    preview
                      ? preview
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="profile"
                  className="profile-preview"
                />
              </label>

              <input
                type="file"
                id="profilePic"
                accept="image/*"
                hidden
                onChange={handleImage}
              />

              <p>Upload Profile Picture</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>

              <div className="form-row">
                <div className="form-group">
                  <label>FIRST NAME *</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>LAST NAME *</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Glenn"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <label>EMAIL ADDRESS *</label>
              <input
                type="email"
                name="email"
                placeholder="astronaut@nasa.gov"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <div className="form-row">
                <div className="form-group">
                  <label>PASSWORD *</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>CONFIRM PASSWORD *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>SPACE AGENCY *</label>
                  <select
                    name="agency"
                    value={formData.agency}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Agency</option>
                    <option value="NASA">NASA</option>
                    <option value="ISRO">ISRO</option>
                    <option value="ESA">ESA</option>
                    <option value="JAXA">JAXA</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>RANK (OPTIONAL)</label>
                  <input
                    type="text"
                    name="rank"
                    placeholder="Commander"
                    value={formData.rank}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="check-row">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  required
                />
                <span>
                  I agree to mission terms & privacy policy
                </span>
              </div>

              <button type="submit" className="login-btn">
                CREATE ACCOUNT
              </button>

            </form>

          </div>

        </div>
      </div>
    </>
  );
}