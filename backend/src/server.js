import express from "express";
import dotenv from "dotenv";
dotenv.config({path:".env"})

const app = express();

const PORT = process.env.PORT || 5001;

try {
  app.listen(PORT, () => {
    console.log(`node server running on ${PORT}`);
  });
} catch (error) {
    console.error("Node error ",error);
    
}
