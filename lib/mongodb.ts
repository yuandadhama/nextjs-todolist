import mongoose, { ConnectOptions } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables.");
}

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(
      MONGODB_URI as string,
      {
        dbName: process.env.USER_DB,
        serverSelectionTimeoutMS: 10000, // Timeout setelah 10 detik jika tidak dapat menemukan server MongoDB
      } as ConnectOptions
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

export default connectDB;
