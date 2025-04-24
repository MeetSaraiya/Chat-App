import mongoose from "mongoose";

// const connectDb = mongoose
//   .connect(process.env.MONGO_URI)
//   .then((value) => {
//     console.log(`connected to mongodb successfully`);
//   })
//   .catch((err) => console.error("MONGO ERROR ", err));

// export {connectDb};

export const connectDb = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((value) => {
      console.log(`connected to mongodb successfully`);
    })
    .catch((err) => console.error("MONGO ERROR ", err));
};
