import express from "express";

import {
  getAllCategoriesController,
  getAllProductsController,
  getProductsByCategorieNameController,
  getProductByIdController,
} from "../controllers/productsControllers";
import { tryCatch } from "../middlewares/tryCatchMiddleware";

export function createProductsRouter() {
  const router = express.Router();

  router.get("/categories", tryCatch(getAllCategoriesController));
  router.get(
    "/categories/:categorieName",
    tryCatch(getProductsByCategorieNameController)
  );
  router.get("/", tryCatch(getAllProductsController));
  router.get("/:id", tryCatch(getProductByIdController));

  return router;
}
