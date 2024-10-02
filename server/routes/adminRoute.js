import express from "express";
import { checkAdminRole, jwtCheck } from "../config/auth0Config.js";
import {
  createResidency,
  getAllResidencies,
  deleteResidency,
} from "../controllers/resdCntrl.js";
import { getAllUsers, deleteUser } from "../controllers/userCntrl.js";
import {
  createCommercial,
  updateCommercial,
} from "../controllers/commercialCntrl.js";

const router = express.Router();

//user admin
router.get("/users", jwtCheck, checkAdminRole, getAllUsers);
router.delete("/deleteUser/:email", jwtCheck, checkAdminRole, deleteUser);

//resd admin
router.get("/allresd", jwtCheck, checkAdminRole, getAllResidencies);
router.delete(
  "/deleteResidency/:id",
  jwtCheck,
  checkAdminRole,
  deleteResidency
);
router.post("/create", jwtCheck, checkAdminRole, createResidency);
router.post("/creareCommercial", jwtCheck, checkAdminRole, createCommercial);
router.put("/updateCommercial/:id", jwtCheck, checkAdminRole, updateCommercial);

export { router as adminRoute };
