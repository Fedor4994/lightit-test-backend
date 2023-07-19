import Joi from "joi";

export const addReviewForProductSchema = Joi.object({
  text: Joi.string().required().allow(""),
  rating: Joi.number().required(),
  username: Joi.string().required(),
});

export const updateReviewForProductSchema = Joi.object({
  text: Joi.string().required().allow(""),
  rating: Joi.number().required(),
});
