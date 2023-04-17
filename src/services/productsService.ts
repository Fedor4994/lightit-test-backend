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

  const total = (await Product.find({})).length;

  const products = await Product.find({})
    .limit(limit)
    .skip(skipCount)
    .sort(getSortType(sort));

  return { products, total };
};

export const getProductById = async (productId: string) => {
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    return false;
  }

  return product;
};

export const getProductsByCategorieName = async (
  categorieName: string,
  { page, limit, sort }: GetAllProductsQuery
) => {
  const skipCount = (page - 1) * limit;

  const total = (await Product.find({ category: categorieName })).length;

  const products = await Product.find({ category: categorieName })
    .limit(limit)
    .skip(skipCount)
    .sort(getSortType(sort));

  return { products, total };
};

export const getAllCategories = async () => {
  const products = await Product.find({});

  const categories = products.map((product) => product.category);

  const uniqueCategories = [...new Set(categories)];

  return uniqueCategories;
};
