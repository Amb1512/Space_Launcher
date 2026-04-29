import express from "express";
import { getCrew } from "../controllers/crewController.js";

const router = express.Router();
router.get("/", getCrew);
export default router;