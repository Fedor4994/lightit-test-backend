import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../db/userModel";
import { AuthRequest } from "../types/request";
import { RequestError } from "../helpers/RequestError";

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw RequestError(401, "Please, provide a token");
    }

    const [, token] = authorization.split(" ");
    if (!token) {
      throw RequestError(401, "Please, provide a token");
    }

    const parts = token.split(".");
    if (parts.length !== 3) {
      throw RequestError(401, "Invalid token");
    }

    const user = jwt.verify(token, process.env.JWT_SECRET || "") as {
      _id: string;
      iat: number;
    };

    const userInDb = await User.findById(user._id);
    if (!userInDb) {
      throw RequestError(401, "Invalid token");
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
