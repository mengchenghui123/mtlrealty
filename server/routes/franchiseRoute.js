import express from "express";
import { createFranchise } from "../controllers/franchiseCntrl.js";
const router = express.Router();

router.post("/creareFranchise", createFranchise);

export { router as franchiseRoute };
