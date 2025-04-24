import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.routes.js";
import { connectDb } from "./lib/db.js";
dotenv.config({path:".env"})

const app = express();

const PORT = process.env.PORT || 5001;

app.use("/api/auth",authRoute);

try {
  app.listen(PORT, () => {
    console.log(`node server running on ${PORT}`);
  });
} catch (error) {
    console.error("Node error ",error);
    
}
