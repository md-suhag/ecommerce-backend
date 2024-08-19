"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRotues = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const adminMiddleware_1 = require("../../middleware/adminMiddleware");
const router = express_1.default.Router();
router.post("/create-account", authMiddleware_1.verifyToken, adminMiddleware_1.isAdmin, user_controller_1.UserController.registerUser);
router.post("/login", user_controller_1.UserController.loginUser);
exports.UserRotues = router;
