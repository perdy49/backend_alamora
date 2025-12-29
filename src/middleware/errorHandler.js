const errorHandler = (err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  res.status(err.status || 500).json({
    msg: err.message || "Internal server error"
  });
};

export default errorHandler;
