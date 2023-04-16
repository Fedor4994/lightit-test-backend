import express from "express";
import {
  getCurrentUserController,
  loginController,
  registerController,
} from "../controllers/authControllers";
import { authValidation } from "../middlewares/validationMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";

export function createAuthRouter() {
  const router = express.Router();

  router.post("/register", authValidation, registerController);
  router.post("/login", authValidation, loginController);
  router.get("/current", authMiddleware, getCurrentUserController);

  return router;
}
