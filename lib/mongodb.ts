import { MongoOptions } from "mongodb";
import mongoose, { MongooseOptions, Schema } from "mongoose";

const uri = process.env.MONGODB_URI as string;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  autoIndex: true,
} as MongooseOptions;

mongoose.connect(
  "mongodb+srv://dbUser:itY@Wai#Ver4Up-@cluster-study.g1epz.mongodb.net/?retryWrites=true&w=majority&appName=cluster-study"
);
