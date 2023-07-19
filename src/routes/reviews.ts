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
import { tryCatch } from "../middlewares/tryCatchMiddleware";

export function createReviewsRouter() {
  const router = express.Router();

  router.get("/:productId", tryCatch(getAllReviewsForProductController));

  router.use(authMiddleware);

  router.get("/", tryCatch(getAllUserReviewsController));

  router.post(
    "/:productId",
    validationMiddleware(addReviewForProductSchema),
    tryCatch(addReviewForProductController)
  );
  router.delete("/:productId", deleteReviewForProductController);
  router.put(
    "/:productId",
    validationMiddleware(updateReviewForProductSchema),
    tryCatch(updateReviewForProductController)
  );

  return router;
}
