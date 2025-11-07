import express from "express";
import User from "../models/user.js";
import Course from "../models/Course.js";
import Note from "../models/Note.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import Enrollment from "../models/Enrollment.js";

const router = express.Router();

/* USER MANAGEMENT  */
router.get("/users", protect, adminOnly, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

router.put("/users/:id", protect, adminOnly, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-password");
  res.json(user);
});

router.delete("/users/:id", protect, adminOnly, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User removed" });
});

/*  COURSE MANAGEMENT  */
router.post("/courses", protect, adminOnly, async (req, res) => {
  const course = await Course.create(req.body);
  res.json(course);
});

router.put("/courses/:id", protect, adminOnly, async (req, res) => {
  const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/courses/:id", protect, adminOnly, async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: "Course deleted" });
});

/*  NOTES MANAGEMENT  */
router.post("/notes", protect, adminOnly, async (req, res) => {
  const note = await Note.create(req.body);
  res.json(note);
});

router.put("/notes/:id", protect, adminOnly, async (req, res) => {
  const updated = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/notes/:id", protect, adminOnly, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
});
// Get user enrollments (Admin only)
router.get("/users/:userId/enrollments", protect, adminOnly, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      user: req.params.userId,
      paymentStatus: "completed",
    })
      .populate("course")
      .sort({ enrolledAt: -1 });
    
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;
