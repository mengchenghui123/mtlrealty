import express from 'express';
import { bookVisit, cancelBookings, createUser, getAllBookings, getAllFav, toFav } from '../controllers/userCntrl.js';
import jwtCheck from '../config/auth0Config.js';

//定义具体的URL路径，当router捕捉到/register这个字样时，去置行userCntrl里的注册函数
const router = express.Router();

router.post("/register", jwtCheck, createUser);
router.post("/bookVisit/:id", jwtCheck, bookVisit)
router.post("/allBookings", getAllBookings)
router.post("/removeBooking/:id", jwtCheck, cancelBookings )
router.post("/toFav/:rid", jwtCheck, toFav)
router.post("/allFav", jwtCheck, getAllFav)
export{router as userRoute}