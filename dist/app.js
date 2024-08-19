"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const products_routes_1 = require("./app/modules/products/products.routes");
const orders_routes_1 = require("./app/modules/orders/orders.routes");
const user_routes_1 = require("./app/modules/users/user.routes");
const app = (0, express_1.default)();
const port = 3000;
// parsers option;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//routes
app.use("/api/products", products_routes_1.ProductRoutes);
app.use("/api/orders", orders_routes_1.OrderRoutes);
app.use("/api/users", user_routes_1.UserRotues);
app.get("/", (req, res) => {
    res.send("Ecommerce inventory server is running...!");
});
exports.default = app;
