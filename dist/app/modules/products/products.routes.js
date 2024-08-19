"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const products_controller_1 = require("./products.controller");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const adminMiddleware_1 = require("../../middleware/adminMiddleware");
const router = express_1.default.Router();
router.get("/", products_controller_1.ProductControllers.getAllProducts);
router.post("/", authMiddleware_1.verifyToken, adminMiddleware_1.isAdmin, products_controller_1.ProductControllers.createProduct);
router.get("/:productId", products_controller_1.ProductControllers.getSingleProduct);
// router.get("/:productId", ProductControllers.getSingleProduct);
router.put("/:productId", authMiddleware_1.verifyToken, adminMiddleware_1.isAdmin, products_controller_1.ProductControllers.updateProduct);
router.delete("/:productId", authMiddleware_1.verifyToken, adminMiddleware_1.isAdmin, products_controller_1.ProductControllers.deleteProduct);
exports.ProductRoutes = router;
