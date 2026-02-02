import express from "express";
import { registreUser } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/register", registreUser);

export default router;