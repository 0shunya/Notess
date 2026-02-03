import express from "express";
import { createNote, getNote, updateNote, deleteNote } from "../controllers/noteController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

//Protected Routes
router.route("/")
    .post(protect, createNote)
    .get(protect, getNote);

router.route("/:id")
  .put(protect, updateNote)
  .delete(protect, deleteNote);

export default router;