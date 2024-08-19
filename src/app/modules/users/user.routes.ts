import express from "express";
import { UserController } from "./user.controller";
import { verifyToken } from "../../middleware/authMiddleware";
import { isAdmin } from "../../middleware/adminMiddleware";
const router = express.Router();

router.post(
  "/create-account",
  verifyToken,
  isAdmin,
  UserController.registerUser
);
router.post("/login", UserController.loginUser);

export const UserRotues = router;
