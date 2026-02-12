const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    next();
  } catch (err) {
    return res.json({
      status: "error",
      erros: err.message,
    });
  }
};

export default validate;
