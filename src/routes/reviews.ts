import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  addReviewForProductController,
  deleteReviewForProductController,
  getAllReviewsForProductController,
  updateReviewForProductController,
} from "../controllers/reviewsControllers";
import {
  addReviewForProductValidation,
  updateReviewForProductValidation,
} from "../middlewares/validationMiddleware";

export function createReviewsRouter() {
  const router = express.Router();

  router.get("/:productId", getAllReviewsForProductController);

  router.use(authMiddleware);

  router.post(
    "/:productId",
    addReviewForProductValidation,
    addReviewForProductController
  );
  router.delete("/:productId", deleteReviewForProductController);
  router.put(
    "/:productId",
    updateReviewForProductValidation,
    updateReviewForProductController
  );

  return router;
}
