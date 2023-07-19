import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  addReviewForProductController,
  deleteReviewForProductController,
  getAllReviewsForProductController,
  getAllUserReviewsController,
  updateReviewForProductController,
} from "../controllers/reviewsControllers";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import {
  addReviewForProductSchema,
  updateReviewForProductSchema,
} from "../schemas/reviewValidator";

export function createReviewsRouter() {
  const router = express.Router();

  router.get("/:productId", getAllReviewsForProductController);

  router.use(authMiddleware);

  router.get("/", getAllUserReviewsController);

  router.post(
    "/:productId",
    validationMiddleware(addReviewForProductSchema),
    addReviewForProductController
  );
  router.delete("/:productId", deleteReviewForProductController);
  router.put(
    "/:productId",
    validationMiddleware(updateReviewForProductSchema),
    updateReviewForProductController
  );

  return router;
}
