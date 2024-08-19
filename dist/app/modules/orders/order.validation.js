"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = void 0;
const zod_1 = require("zod");
exports.orderValidationSchema = zod_1.z.object({
    email: zod_1.z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }),
    productId: zod_1.z.string({
        required_error: "Product Id is required",
        invalid_type_error: "Product ID must be a string of Mongodb _id",
    }),
    quantity: zod_1.z
        .number({
        required_error: "Quantity Id is required",
        invalid_type_error: "Quantity must be a number",
    })
        .positive(),
    price: zod_1.z.number({
        required_error: "Price Id is required",
        invalid_type_error: "Price must be a number",
    }),
});
exports.default = exports.orderValidationSchema;
