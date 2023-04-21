import { Product } from "../db/productModel";
import { Review } from "../db/reviewModel";
import { ProductData } from "../types/product";
import { ReviewData } from "../types/reviews";
import { getProductById } from "./productsService";

const updateProductRaiting = async (productId: string) => {
  const reviews = await Review.find({ productId });

  const ratingSumm = reviews.reduce((acc, review) => acc + review.rating, 0);
  const newAverageRatingForProduct = Number(
    (ratingSumm / reviews.length).toFixed(2)
  );

  await Product.findOneAndUpdate(
    {
      _id: productId,
    },
    {
      rating: newAverageRatingForProduct,
    }
  );

  return newAverageRatingForProduct;
};

export const getAllReviewsForProduct = async (productId: string) => {
  const reviews = await Review.find({ productId });

  return reviews;
};

export const addReview = async ({
  text,
  rating,
  username,
  productId,
  userId,
}: ReviewData) => {
  const usersReviewInProduct = await Review.findOne({ productId, userId });
  if (usersReviewInProduct) {
    return false;
  }

  const review = new Review({
    text,
    rating,
    username,
    productId,
    userId,
  });

  const result = await review.save();

  const newAverageRatingForProduct = await updateProductRaiting(productId);

  return { review: result, rating: newAverageRatingForProduct };
};

export const removeReview = async (productId: string, userId: string) => {
  const deletedReview = await Review.findOneAndRemove({
    productId,
    userId,
  });

  if (!deletedReview) {
    return false;
  }

  const newAverageRatingForProduct = await updateProductRaiting(productId);

  return { deletedReview, rating: newAverageRatingForProduct };
};

export const updateReview = async (
  text: string,
  rating: number,
  productId: string,
  userId: string
) => {
  const updatedReview = await Review.findOneAndUpdate(
    { productId, userId },
    {
      text,
      rating,
    },
    { new: true }
  );

  if (!updatedReview) {
    return false;
  }

  const newAverageRatingForProduct = await updateProductRaiting(productId);

  return { updatedReview, rating: newAverageRatingForProduct };
};

export const getAllUserReviews = async (userId: string) => {
  const reviews = await Review.find({ userId });

  const reviewsWithProducts = await Promise.all(
    reviews.map(async (review) => {
      const product = await Product.findById(review.productId);

      return { review, product };
    })
  );

  return reviewsWithProducts;
};
