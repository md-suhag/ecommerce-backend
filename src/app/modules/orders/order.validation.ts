import { z } from "zod";

export const orderValidationSchema = z.object({
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  }),
  productId: z.string({
    required_error: "Product Id is required",
    invalid_type_error: "Product ID must be a string of Mongodb _id",
  }),
  quantity: z
    .number({
      required_error: "Quantity Id is required",
      invalid_type_error: "Quantity must be a number",
    })
    .positive(),
  price: z.number({
    required_error: "Price Id is required",
    invalid_type_error: "Price must be a number",
  }),
});
export default orderValidationSchema;
