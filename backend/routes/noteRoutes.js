import express from "express";
import { createNote, getNote } from "../controllers/noteController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

//Protected Routes
router.route("/")
    .post(protect, createNote)
    .get(protect, getNote);

export default router;