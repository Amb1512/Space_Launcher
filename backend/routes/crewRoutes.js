
import express from "express";
import { getCrew } from "../controllers/crewController.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.get("/", auth, getCrew);
export default router;