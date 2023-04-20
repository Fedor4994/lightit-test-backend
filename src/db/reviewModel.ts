import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    text: {
      type: String,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    userId: {
      type: String,
      required: [true, "UserId is required"],
    },
    productId: {
      type: String,
      required: [true, "ProductId is required"],
    },
  },
  { timestamps: true, versionKey: false }
);

export const Review = mongoose.model("reviews", reviewSchema);
