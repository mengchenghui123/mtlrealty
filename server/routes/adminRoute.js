import express from 'express';
import { checkAdminRole, jwtCheck } from '../config/auth0Config.js';
import { createResidency, getAllResidencies, deleteResidency } from '../controllers/resdCntrl.js';
import {getAllUsers, deleteUser} from '../controllers/userCntrl.js';

const router = express.Router()

//user admin
router.get('/users', jwtCheck,checkAdminRole,getAllUsers);
router.delete('/deleteUser/:email', jwtCheck, checkAdminRole, deleteUser);

//resd admin
router.get('/allresd', jwtCheck,checkAdminRole,getAllResidencies);
router.delete('/deleteResidency/:id', jwtCheck,checkAdminRole,deleteResidency);
router.post('/create', jwtCheck,checkAdminRole, createResidency);

export {router as adminRoute}