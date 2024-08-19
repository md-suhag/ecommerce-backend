import { Request, Response } from "express";
import productValidationSchema from "./products.validation";
import { ProductServices } from "./products.services";
import test from "node:test";

const createProduct = async (req: Request, res: Response) => {
  try {
    // console.log(req.body);
    const zodParser = productValidationSchema.parse(req.body);
    const result = await ProductServices.createAProductIntoDB(zodParser);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error,
    });
  }

  //   res.send("Product Route from controller");
};

const getAllProducts = async (req: Request, res: Response) => {
  //   const result = await ProductServices.getProdutsFromDB();
  const { searchTerm } = req.query;
  const result = await ProductServices.getProdutsFromDB(searchTerm as string);
  if (result.length < 1) {
    return res.status(200).json({
      success: true,
      message: "No product found",
      data: result,
    });
  }
  res.status(200).json({
    success: true,
    message: "Products fetched successfully!",
    data: result,
  });
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const data = req.body;
    const result = await ProductServices.updateProductIntoDB(productId, data);
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    await ProductServices.deleteProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
