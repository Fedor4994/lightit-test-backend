const Joi = require("joi");

module.exports = {
  registerValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
    });

    const validatoinResult = schema.validate(req.body);
    if (validatoinResult.error) {
      return res.status(400).json({
        message: `${validatoinResult.error}`,
      });
    }

    next();
  },

  loginValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const validatoinResult = schema.validate(req.body);
    if (validatoinResult.error) {
      return res.status(400).json({
        message: `${validatoinResult.error}`,
      });
    }

    next();
  },
};
