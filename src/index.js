import express from 'express'; 
import apiV1 from './routes/index-router.js';
import dotenv from 'dotenv'; 
import cors from  'cors'

const app = express(); 
dotenv.config();

app.use(cors({
    origin: "https://infy-comments.vercel.app", 
    methods: ["GET", "POST", "PATCH", "DELETE"], 
    credentials: true
})); 

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000; 

app.use("/api/v1", apiV1); 

app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
}); 