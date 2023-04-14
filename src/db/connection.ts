import mongoose from "mongoose";

const uriDb = process.env.MONGO_URL || "";

mongoose.set("strictQuery", false);
export const connection = mongoose.connect(uriDb);
