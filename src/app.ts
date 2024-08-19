import express from "express";
import cors from "cors";
import { ProductRoutes } from "./app/modules/products/products.routes";
import { OrderRoutes } from "./app/modules/orders/orders.routes";
import { UserRotues } from "./app/modules/users/user.routes";

const app = express();
const port = 3000;

// parsers option;
app.use(express.json());
app.use(cors());

//routes
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/users", UserRotues);

app.get("/", (req, res) => {
  res.send("Ecommerce inventory server is running...!");
});

export default app;
