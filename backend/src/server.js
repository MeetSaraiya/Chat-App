import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.routes.js";
import { connectDb } from "./lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config({ path: ".env" });

const app = express();

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser())

// Define routes
app.use("/api/auth", authRoute);

try {
  app.listen(PORT, () => {
    console.log(`Node server running on ${PORT}`);
    connectDb(); // Ensure database connection
  });
} catch (error) {
  console.error("Node error", error);
}
