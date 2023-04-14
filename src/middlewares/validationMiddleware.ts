import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const authValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  const validatoinResult = schema.validate(req.body);
  if (validatoinResult.error) {
    return res.status(400).json({
      message: `${validatoinResult.error}`,
    });
  }

  next();
};
