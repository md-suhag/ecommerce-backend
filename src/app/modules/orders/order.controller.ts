import { Request, Response } from "express";
import orderValidationSchema from "./order.validation";
import { Product } from "../products/products.model";
import { OrderServices } from "./orders.services";
const createOrder = async (req: Request, res: Response) => {
  try {
    // zod validation

    const zodValidation = orderValidationSchema.safeParse(req.body);
    if (
      typeof zodValidation.error !== "undefined" &&
      zodValidation.error.name === "ZodError"
    ) {
      const errorLists = zodValidation.error.issues.map((err) => err.message);
      return res.status(500).json({
        success: false,
        message: "Validation error",
        errors: errorLists,
      });
    }
    if (zodValidation.success) {
      const product = await Product.findById(zodValidation.data.productId);
      if (product && product.inventory.quantity < zodValidation.data.quantity) {
        return res.status(400).json({
          success: false,
          message: "Insufficient quantity available in this inventory",
        });
      }
      if (product) {
        product.inventory.quantity =
          product.inventory.quantity - zodValidation.data.quantity;
        product.inventory.inStock =
          product.inventory.quantity === 0 ? false : true;
        const newOrder = await OrderServices.createANewOrder(
          zodValidation.data
        );
        await product.save();

        res.status(201).json({
          success: true,
          message: "Order placed successfully",
          data: newOrder,
        });
      }
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error,
    });
  }
  //   res.send("Product Route from controller");
};
const getAllOrders = async (req: Request, res: Response) => {
  const email = req.query.email;
  try {
    const orders = await OrderServices.getAllOrdersFromDB(
      (email as string) || undefined
    );
    if (orders.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No orders found for this email",
        data: [],
      });
    }
    res.status(500).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error,
    });
  }
};
export const OrderControllers = {
  createOrder,
  getAllOrders,
};
