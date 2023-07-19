import mongoose from "mongoose";
import { hashPassword } from "../helpers/hash-password";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

userSchema.pre("save", async function () {
  if (this.isNew) {
    this.password = await hashPassword(this.password);
  }
});

export const User = mongoose.model("users", userSchema);
