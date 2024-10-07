import express from "express";
import {
  createFranchise,
  getAllFranchise,
} from "../controllers/franchiseCntrl.js";

const router = express.Router();

router.get("/allfrchs", getAllFranchise);

export { router as franchiseRoute };
