import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongodb is connected successfully");
  } catch (error) {
    console.error("error connection mongodb", error);
    process.exit(1);
  }
};
