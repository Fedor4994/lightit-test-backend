import { Product } from "../db/productModel";

export const getAllProducts = async () => {
  const products = await Product.find({});
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
  const products = await getAllProducts();

  const categories = products.map((product) => product.category);
  return categories;
};
