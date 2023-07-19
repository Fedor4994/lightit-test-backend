import { Response, NextFunction } from "express";
import { AuthRequest, RequestWithParams } from "../types/request";
import {
  addReview,
  getAllReviewsForProduct,
  getAllUserReviews,
  removeReview,
  updateReview,
} from "../services/reviewsService";
import { RequestError } from "../helpers/RequestError";

export const getAllReviewsForProductController = async (
  req: RequestWithParams<{ productId: string }>,
  res: Response,
  next: NextFunction
) => {
  const { productId } = req.params;
  const reviews = await getAllReviewsForProduct(productId);

  res.json(reviews);
};

export const addReviewForProductController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { productId } = req.params;
  const { text, rating, username } = req.body;
  const userId = req.user?._id || "";

  const data = await addReview({
    text,
    rating,
    username,
    productId,
    userId,
  });

  if (!data) {
    throw RequestError(400, "User already have review for this product");
  }

  res.status(201).json(data);
};

export const deleteReviewForProductController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { productId } = req.params;
  const userId = req.user?._id || "";
  const data = await removeReview(productId, userId);

  if (!data) {
    throw RequestError(404, "Not found review for this user");
  }

  res.status(200).json(data);
};

export const updateReviewForProductController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { productId } = req.params;
  const { text, rating } = req.body;
  const userId = req.user?._id || "";

  const data = await updateReview(text, rating, productId, userId);

  if (!data) {
    throw RequestError(404, "Not found review for this user");
  }

  res.status(200).json(data);
};

export const getAllUserReviewsController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id || "";

  const reviews = await getAllUserReviews(userId);
  res.json(reviews);
};
