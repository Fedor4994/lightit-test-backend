import express from "express";
import {
  getCurrentUserController,
  loginController,
  registerController,
} from "../controllers/authControllers";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { authSchema } from "../schemas/userValidator";

export function createAuthRouter() {
  const router = express.Router();

  router.post(
    "/register",
    validationMiddleware(authSchema),
    registerController
  );
  router.post("/login", validationMiddleware(authSchema), loginController);
  router.get("/current", authMiddleware, getCurrentUserController);

  return router;
}
