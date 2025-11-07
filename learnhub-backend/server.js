import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courses.js"
import notesRoutes from './routes/notes.js'
import connectDB from "./config/Db.js";
import adminRoutes from './routes/adminRoutes.js'
import contactRoutes from './routes/ContactRoutes.js'
import enrollmentRoutes from './routes/enrollmentRoutes.js'
dotenv.config();

connectDB();
const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use('/api/contact', contactRoutes);
app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT || 5000}`));
