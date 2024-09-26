import express from "express";
import {
  createResidency,
  getAllResidencies,
  getResidency,
  updateResidency,
} from "../controllers/resdCntrl.js";
import { jwtCheck, checkAdminRole } from "../config/auth0Config.js";

const router = express.Router();

router.post("/create", jwtCheck, checkAdminRole, createResidency);
router.get("/allresd", getAllResidencies);
router.get("/:id", getResidency);
router.put("/update/:id", updateResidency);

export { router as residencyRoute };
