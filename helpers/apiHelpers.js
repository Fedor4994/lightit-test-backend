const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(() =>
      next({
        message: "Not Found",
        status: 404,
      })
    );
  };
};

module.exports = {
  asyncWrapper,
};
