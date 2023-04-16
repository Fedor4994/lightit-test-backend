import { Response, NextFunction } from "express";
import { getCurrentUser, login, register } from "../services/authService";
import { AuthRequest, RequestWithBody } from "../types/request";
import { UserData } from "../types/user";
import { RequestError } from "../helpers/RequestError";
import { AuthUserResponse } from "../types/response";

export const registerController = async (
  req: RequestWithBody<UserData>,
  res: Response<AuthUserResponse>,
  next: NextFunction
) => {
  try {
    const data = await register(req.body);
    if (!data) {
      throw RequestError(409, "Username in use");
    }

    res.status(201).json({
      user: {
        username: data.newUser.username,
        _id: data.newUser._id,
      },
      token: data.token,
    });
  } catch (err) {
    next(err);
  }
};

export const loginController = async (
  req: RequestWithBody<UserData>,
  res: Response<AuthUserResponse>,
  next: NextFunction
) => {
  try {
    const data = await login(req.body);
    if (!data) {
      throw RequestError(401, "Email or password is wrong");
    }

    res.status(200).json({
      user: {
        username: data.newUser.username,
        _id: data.newUser._id,
      },
      token: data.token,
    });
  } catch (err) {
    next(err);
  }
};

export const getCurrentUserController = async (
  req: AuthRequest,
  res: Response<Omit<AuthUserResponse, "token">>,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw RequestError(401, "Not authorized");
    }

    const user = await getCurrentUser(req.user);
    if (!user) {
      throw RequestError(401, "Not authorized");
    }

    res.status(200).json({
      user: {
        username: user.username,
        _id: user._id,
      },
    });
  } catch (err) {
    next(err);
  }
};
