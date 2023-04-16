import express from "express";

import {
  getAllCategoriesController,
  getAllProductsController,
  getProductsByCategorieNameController,
  getProductByIdController,
} from "../controllers/productsControllers";

export function createProductsRouter() {
  const router = express.Router();

  router.get("/categories", getAllCategoriesController);
  router.get(
    "/categories/:categorieName",
    getProductsByCategorieNameController
  );
  router.get("/", getAllProductsController);
  router.get("/:id", getProductByIdController);

  return router;
}
