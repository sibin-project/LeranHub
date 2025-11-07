import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//  REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
      studyStreak: 0, 
      visitedDays: [],
      lastLogin: null,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      message: "Registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        streak: user.studyStreak,
        visitedDays: user.visitedDays.length,
        lastLogin: user.lastLogin,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//  LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // --- STREAK LOGIC ---
    const today = new Date().toISOString().split("T")[0];
    const lastLogin = user.lastLogin ? user.lastLogin.toISOString().split("T")[0] : null;

    if (lastLogin !== today) {
      // Add visited day if not already visited today
      if (!user.visitedDays.includes(today)) {
        user.visitedDays.push(today);
      }

      // Calculate streak
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      if (lastLogin === yesterdayStr) {
        user.studyStreak += 1;
      } else if (lastLogin === null) {
        //  First time login
        user.studyStreak = 1;
      } else {
        //  Streak broken
        user.studyStreak = 1;
      }
    }

    // update timestamps
    const now = new Date();
    user.lastLogin = now;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        streak: user.studyStreak,
        visitedDays: user.visitedDays.length,
        lastLogin: user.lastLogin,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
//  PROFILE (with lastSeen update)
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    
    //  Format response to match login response
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      streak: user.studyStreak,
      visitedDays: user.visitedDays.length,
      lastLogin: user.lastLogin,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
