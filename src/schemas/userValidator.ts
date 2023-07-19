import Joi from "joi";

export const authSchema = Joi.object({
  username: Joi.string().min(2).max(20).required(),
  password: Joi.string().min(6).max(20).required(),
});
