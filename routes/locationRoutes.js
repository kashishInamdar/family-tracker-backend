import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { updateLocation, getFamilyLocations } from "../controllers/locationController.js";

const router = express.Router();

router.post("/update", authMiddleware, updateLocation);
router.get("/family", authMiddleware, getFamilyLocations);

export default router;
