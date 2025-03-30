// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (typeof res.status === 'function') {
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ error: message });
  } else {
    console.error('Fatal: Response object is invalid');
  }
};

module.exports = errorHandler;
