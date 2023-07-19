import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    text: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Review = mongoose.model("reviews", reviewSchema);
