import express from "express";
import {config} from "dotenv";
import authRoute from "./routes/auth.routes.js";
import { connectDb } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import messageRoutes from "./routes/message.routes.js"
config();

const app = express();

const PORT = process.env.PORT || 5001;

app.use(express.json({ limit: '10mb' })); // Adjust the limit as per your needs
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true,
}))

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoutes);

try {
  app.listen(PORT, () => {
    console.log(`Node server running on ${PORT}`);
    connectDb(); // Ensure database connection
  });
} catch (error) {
  console.error("Node error", error);
}
