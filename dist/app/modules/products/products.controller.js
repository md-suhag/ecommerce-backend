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
exports.ProductControllers = void 0;
const products_validation_1 = __importDefault(require("./products.validation"));
const products_services_1 = require("./products.services");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.body);
        const zodParser = products_validation_1.default.parse(req.body);
        const result = yield products_services_1.ProductServices.createAProductIntoDB(zodParser);
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: result,
        });
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
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   const result = await ProductServices.getProdutsFromDB();
    const { searchTerm } = req.query;
    const result = yield products_services_1.ProductServices.getProdutsFromDB(searchTerm);
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
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield products_services_1.ProductServices.getSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: result,
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
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const data = req.body;
        const result = yield products_services_1.ProductServices.updateProductIntoDB(productId, data);
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: result,
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
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        yield products_services_1.ProductServices.deleteProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null,
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
exports.ProductControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
