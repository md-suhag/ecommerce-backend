"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const order_validation_1 = __importDefault(require("./order.validation"));
const products_model_1 = require("../products/products.model");
const orders_services_1 = require("./orders.services");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // zod validation
        const zodValidation = order_validation_1.default.safeParse(req.body);
        if (typeof zodValidation.error !== "undefined" &&
            zodValidation.error.name === "ZodError") {
            const errorLists = zodValidation.error.issues.map((err) => err.message);
            return res.status(500).json({
                success: false,
                message: "Validation error",
                errors: errorLists,
            });
        }
        if (zodValidation.success) {
            const product = yield products_model_1.Product.findById(zodValidation.data.productId);
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
                const newOrder = yield orders_services_1.OrderServices.createANewOrder(zodValidation.data);
                yield product.save();
                res.status(201).json({
                    success: true,
                    message: "Order placed successfully",
                    data: newOrder,
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
            error,
        });
    }
    //   res.send("Product Route from controller");
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    try {
        const orders = yield orders_services_1.OrderServices.getAllOrdersFromDB(email || undefined);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
            error,
        });
    }
});
exports.OrderControllers = {
    createOrder,
    getAllOrders,
};
