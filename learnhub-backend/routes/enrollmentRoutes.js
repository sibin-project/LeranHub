import express from "express";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get user's enrollments
router.get("/my-enrollments", protect, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ 
      user: req.user.id,
      paymentStatus: "completed"
    }).populate("course");
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Check if user is enrolled in a course
router.get("/check/:courseId", protect, async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      user: req.user.id,
      course: req.params.courseId,
      paymentStatus: "completed",
    });
    res.json({ enrolled: !!enrollment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Enroll in a free course
router.post("/enroll-free/:courseId", protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.price > 0) {
      return res.status(400).json({ message: "This is not a free course" });
    }

    // Check if already enrolled
    const existing = await Enrollment.findOne({
      user: req.user.id,
      course: course._id,
    });

    if (existing) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    // Create enrollment
    const enrollment = await Enrollment.create({
      user: req.user.id,
      course: course._id,
      paymentStatus: "completed",
      amount: 0,
    });

    res.status(201).json({
      message: "Successfully enrolled in the course!",
      enrollment,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create payment order for paid course
router.post("/create-payment/:courseId", protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.price === 0) {
      return res.status(400).json({ message: "This is a free course" });
    }

    // Check if already enrolled
    const existing = await Enrollment.findOne({
      user: req.user.id,
      course: course._id,
      paymentStatus: "completed",
    });

    if (existing) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    // Create pending enrollment
    const enrollment = await Enrollment.create({
      user: req.user.id,
      course: course._id,
      paymentStatus: "pending",
      amount: course.price,
    });

    // In production, integrate with Razorpay/Stripe here
    res.json({
      enrollmentId: enrollment._id,
      amount: course.price,
      courseName: course.title,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Complete payment (simulate payment success)
router.post("/complete-payment/:enrollmentId", protect, async (req, res) => {
  try {
    const { paymentId } = req.body;
    
    const enrollment = await Enrollment.findById(req.params.enrollmentId);
    
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    if (enrollment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    enrollment.paymentStatus = "completed";
    enrollment.paymentId = paymentId || `PAY_${Date.now()}`;
    await enrollment.save();

    res.json({
      message: "Payment successful! You are now enrolled in the course.",
      enrollment,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;