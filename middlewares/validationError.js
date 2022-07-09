const HttpError = require('../components/HttpError');
const ConflictError = require('../components/ConflictError');

const validationError = (err, message) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') return new HttpError(message);

  if (err.code === 11000) return new ConflictError(message);

  return err;
};

module.exports = { validationError };
