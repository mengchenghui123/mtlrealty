import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { userRoute } from './routes/userRoute.js';
import { residencyRoute } from './routes/residencyRoute.js';
import path from 'path'

dotenv.config()

const app = express();

const PORT = process.env.PORT || 3000;

app.use((req, res, next) => { res.setHeader('Cache-Control', 'public, max-age=31536000'); res.setHeader('X-Content-Type-Options', 'nosniff'); next(); });

app.use(express.json())
app.use(cookieParser())
app.use(cors())


app.use('/api/user', userRoute)
app.use("/api/residency", residencyRoute);


app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
});