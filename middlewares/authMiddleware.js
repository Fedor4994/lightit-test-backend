const jwt = require("jsonwebtoken");
const { User } = require("../db/userModel");

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: "Please, provide a token in request authorization headers",
    });
  }
  const [, token] = authorization.split(" ");
  if (!token) {
    return res.status(401).json({
      message: "Please, provide a token",
    });
  }

  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);

    const userInDb = await User.findById(user._id);
    if (!userInDb) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = {
  authMiddleware,
};
