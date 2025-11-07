import express from "express";
import Contact from "../models/Contact.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

//  CONTACT FORM SUBMISSION
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    //  Create a new contact entry
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });

    await newContact.save();

    res.status(201).json({ message: "Contact form submitted successfully" });
  } catch (err) {
    console.error("Error saving contact:", err);
    res.status(500).json({ error: "Server error, please try again later" });
  }
});

//  Fetch all contacts (Admin only)
router.get("/admin/contacts", protect, adminOnly, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Update contact status (resolved/pending)
router.patch("/admin/contacts/:id/status", protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    contact.status = status;
    await contact.save();

    res.json({ message: `Contact marked as ${status}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
