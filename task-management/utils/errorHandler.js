const errorHandler = (err, req, res, next) => {
     
    const statusCode = err.statusCode || 500;
  
    res.status(statusCode).json({
      message: err.message || 'Internal Server Error',
    });
  };
  
  module.exports = errorHandler;