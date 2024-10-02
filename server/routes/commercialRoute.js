import express from "express";
import { getAllCommercial } from "../controllers/commercialCntrl.js";

const router = express.Router();
router.get("/allComme", getAllCommercial);

export { router as commercialRoute };
