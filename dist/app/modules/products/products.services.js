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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const products_model_1 = require("./products.model");
const createAProductIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.create(productData);
    return result;
});
const getProdutsFromDB = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (searchTerm = "") {
    const query = searchTerm
        ? { name: { $regex: searchTerm, $options: "i" } }
        : {};
    const data = yield products_model_1.Product.find(query);
    return data;
});
const getSingleProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.findById(productId);
    return result;
});
const updateProductIntoDB = (productId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.findByIdAndUpdate(productId, data, {
        new: true,
    });
    return result;
});
const deleteProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.findByIdAndDelete(productId);
    return result;
});
exports.ProductServices = {
    createAProductIntoDB,
    getProdutsFromDB,
    getSingleProductFromDB,
    updateProductIntoDB,
    deleteProductFromDB,
};
