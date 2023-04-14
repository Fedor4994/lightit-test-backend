import { Response, NextFunction } from "express";
import { getCurrentUser, login, register } from "../services/authService";
import { AuthRequest, TypedRequestBody } from "../types/request";
import { UserData } from "../types/user";

export const registerController = async (
  req: TypedRequestBody<UserData>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await register(req.body);
    data
      ? res.status(201).json({
          user: {
            name: data.newUser.username,
            _id: data.newUser._id,
          },
          token: data.token,
        })
      : res.status(409).json({ message: "Username in use" });
  } catch (err) {
    next(err);
  }
};

export const loginController = async (
  req: TypedRequestBody<Omit<UserData, "name">>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await login(req.body);
    data
      ? res.status(200).json({
          user: {
            username: data.newUser.username,
            _id: data.newUser._id,
          },
          token: data.token,
        })
      : res.status(401).json({
          message: "Email or password is wrong",
        });
  } catch (err) {
    next(err);
  }
};

export const getCurrentUserController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  const user = await getCurrentUser(req.user);

  user
    ? res.status(200).json({
        user: {
          username: user.username,
          _id: user._id,
        },
      })
    : res.status(401).json({
        message: "Not authorized",
      });
};
