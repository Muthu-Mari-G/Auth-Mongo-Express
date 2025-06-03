import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import users from "./routes/users.js";

dotenv.config();

const app = express();
app.use(express.json());
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use("/uploads", express.static("uploads"));

app.use(express.urlencoded({ extended: true}));
app.use(users);

const uri = process.env.MONGODB_URI;

mongoose
.connect(uri)
.then(()=>{console.log("mongoDB Connected")})
.catch((error) => {
    console.log("MongoDB connection error", error)
})

const PORT = process.env.PORT || 3001;

app.listen(PORT,()=> {
    console.log(`server running on http://localhost:${PORT}`)
})