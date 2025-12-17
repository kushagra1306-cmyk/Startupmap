const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
  
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: 'Validation error',
        details: err.errors.map(e => e.message)
      });
    }
  
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        error: 'Email already exists'
      });
    }
  
    res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  };
  
  module.exports = errorHandler;