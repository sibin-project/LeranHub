import express from "express";
import Notes from "../models/Note.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all active notes
router.get("/", async (req, res) => {
  try {
    const notes = await Notes.find({ isActive: true })
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get notes by course
router.get("/course/:courseName", async (req, res) => {
  try {
    const notes = await Notes.find({ 
      course: req.params.courseName,
      isActive: true 
    }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single note by ID
router.get("/:id", async (req, res) => {
  try {
    const notes = await Notes.findById(req.params.id).populate("uploadedBy", "name email");
    if (!notes) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new note (protected)
router.post("/", protect, async (req, res) => {
  try {
    const note = await Notes.create({
      ...req.body,
      uploadedBy: req.user.id,
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update note
router.put("/:id", protect, async (req, res) => {
  try {
    const note = await Notes.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete note
router.delete("/:id", protect, async (req, res) => {
  try {
    const note = await Notes.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;