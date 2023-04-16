import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    discountPercentage: {
      type: Number,
      required: [true, "DiscountPercentage is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    images: [{ type: String }],
  },
  { versionKey: false }
);

export const Product = mongoose.model("products", productSchema);
