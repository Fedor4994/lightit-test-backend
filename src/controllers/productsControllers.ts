import { Request, Response, NextFunction } from "express";
import { RequestError } from "../helpers/RequestError";
import {
  RequestWithParams,
  RequestWithParamsAndQuery,
  RequestWithQuery,
} from "../types/request";
import { ProductData } from "../types/product";
import {
  getAllCategories,
  getAllProducts,
  getProductById,
  getProductsByCategorieName,
} from "../services/productsService";
import mongoose from "mongoose";
import { SortType } from "../types/sortType";

export const getAllProductsController = async (
  req: RequestWithQuery<{ page?: number; limit?: number; sort?: SortType }>,
  res: Response<{ products: ProductData[]; total: number }>,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10, sort = "rating-desc-rank" } = req.query;

    const data = await getAllProducts({ page, limit, sort });
    const { products, total } = data;

    res.json({ products, total });
  } catch (err) {
    next(err);
  }
};

export const getProductByIdController = async (
  req: RequestWithParams<{ id: string }>,
  res: Response<ProductData>,
  next: NextFunction
) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw RequestError(404, "Not found");
    }

    const product = await getProductById(req.params.id);

    if (!product) {
      throw RequestError(404, "Not found");
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const getProductsByCategorieNameController = async (
  req: RequestWithParamsAndQuery<
    { categorieName: string },
    { page?: number; limit?: number; sort?: SortType }
  >,
  res: Response<{ products: ProductData[]; total: number }>,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10, sort = "rating-desc-rank" } = req.query;

    const data = await getProductsByCategorieName(req.params.categorieName, {
      page,
      limit,
      sort,
    });

    const { products, total } = data;

    res.json({ products, total });
  } catch (err) {
    next(err);
  }
};

export const getAllCategoriesController = async (
  req: Request,
  res: Response<string[]>,
  next: NextFunction
) => {
  try {
    const categories = await getAllCategories();

    res.json(categories);
  } catch (err) {
    next(err);
  }
};
