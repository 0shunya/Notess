import express from "express";
import { registreUser, loginUser } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/register", registreUser);
router.post("/login", loginUser);


export default router;