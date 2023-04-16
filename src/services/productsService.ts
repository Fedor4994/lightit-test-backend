import { Product } from "../db/productModel";
import { getSortType } from "../helpers/getSortType";
import { SortType } from "../types/sortType";

type GetAllProductsQuery = { page: number; limit: number; sort: SortType };

export const getAllProducts = async ({
  page,
  limit,
  sort,
}: GetAllProductsQuery) => {
  const skipCount = (page - 1) * limit;

  const products = await Product.find({})
    .limit(limit)
    .skip(skipCount)
    .sort(getSortType(sort));

  return products;
};

export const getProductById = async (productId: string) => {
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    return false;
  }

  return product;
};

export const getProductsByCategorieName = async (categorieName: string) => {
  const products = await Product.find({ category: categorieName });

  return products;
};

export const getAllCategories = async () => {
  const products = await Product.find({});

  const categories = products.map((product) => product.category);
  return categories;
};
