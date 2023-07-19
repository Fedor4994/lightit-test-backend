import express from "express";
import {
  getCurrentUserController,
  loginController,
  registerController,
} from "../controllers/authControllers";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { authSchema } from "../schemas/userValidator";
import { tryCatch } from "../middlewares/tryCatchMiddleware";

export function createAuthRouter() {
  const router = express.Router();

  router.post(
    "/register",
    validationMiddleware(authSchema),
    tryCatch(registerController)
  );
  router.post(
    "/login",
    validationMiddleware(authSchema),
    tryCatch(loginController)
  );
  router.get("/current", authMiddleware, tryCatch(getCurrentUserController));

  return router;
}
