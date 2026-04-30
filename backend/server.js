import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import connectDB from "./database/db.js";
import crewRoutes from "./routes/crewRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import User from "./models/user.js";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

// Session middleware
app.use(session({
  secret: process.env.JWT_SECRET || "secret",
  resave: false,
  saveUninitialized: false,
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy",
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails && profile.emails[0] && profile.emails[0].value;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name: profile.displayName,
        email,
        password: ""
      });
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// Google OAuth routes
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
app.get("/auth/google/callback", passport.authenticate("google", {
  failureRedirect: "/login",
  session: false
}), (req, res) => {
  // Successful authentication
  const user = req.user;
  const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ message: "Google OAuth login successful", token });
});
// Health check endpoint for MongoDB (must be after app is defined)
app.get("/health", (req, res) => {
  const mongoState = mongoose.connection.readyState;
  // 1 = connected, 2 = connecting, 0 = disconnected, 3 = disconnecting
  let status = "disconnected";
  if (mongoState === 1) status = "connected";
  else if (mongoState === 2) status = "connecting";
  else if (mongoState === 3) status = "disconnecting";
  res.json({ mongo: status });
});

app.use(cors());
app.use(express.json());

app.use("/crew", crewRoutes);
app.use("/user", userRoutes);

const PORT = 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log("🚀 Server Running");
  });
};

startServer();