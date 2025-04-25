import mongoose from "mongoose";

export const connectDb = async () => {
  // mongoose
  //   .connect(process.env.MONGO_URI)
  //   .then((value) => {
  //     console.log(`connected to mongodb successfully`);
  //   })
  //   .catch((err) => console.error("MONGO ERROR ", err));
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongo connected at host : ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    
  }
};
