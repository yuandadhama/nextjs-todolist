import mongoose, { Model, Schema } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  username: string;
  password: string;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
