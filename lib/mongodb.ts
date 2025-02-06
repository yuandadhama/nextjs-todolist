import mongoose, { ConnectOptions } from "mongoose";

// Ambil URI MongoDB dari environment variable
const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local"
  );
}

// Untuk caching koneksi (agar di development tidak membuat koneksi baru tiap request)
let cached = (global as any).mongoose;
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

const options = {
  dbName: process.env.USER_DB as string,
  useUnifiedTopology: true,
} as ConnectOptions;

async function connectDB() {
  // Jika koneksi sudah ada, langsung kembalikan
  if (cached.conn) {
    return cached.conn;
  }
  // Jika belum, buat promise untuk koneksi
  if (!cached.promise) {
    cached.promise = await mongoose.connect(MONGODB_URI, options);
  }
  console.log(cached.promise);
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
