const loggerMiddleware = (req, res, next) => {
  const id = req.params.id;
  if (id === "1") {
    return res.json({
      message: "Access denied",
    });
  }

  next();
};

export default loggerMiddleware;
