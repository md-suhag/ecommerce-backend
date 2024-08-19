import { TProduct } from "./products.interface";
import { Product } from "./products.model";

const createAProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};
const getProdutsFromDB = async (searchTerm = "") => {
  const query = searchTerm
    ? { name: { $regex: searchTerm, $options: "i" } }
    : {};
  const data = await Product.find(query);
  return data;
};
const getSingleProductFromDB = async (productId: string) => {
  const result = await Product.findById(productId);
  return result;
};

const updateProductIntoDB = async (productId: string, data: TProduct) => {
  const result = await Product.findByIdAndUpdate(productId, data, {
    new: true,
  });
  return result;
};
const deleteProductFromDB = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);
  return result;
};

export const ProductServices = {
  createAProductIntoDB,
  getProdutsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
