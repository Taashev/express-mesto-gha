const HttpError = require('../components/HttpError');
const NotFoundError = require('../components/NotFoundError');
const UnauthorizedError = require('../components/UnauthorizedError');
const ConflictError = require('../components/ConflictError');

const validationError = (err, message) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') return new HttpError(message);

  if (err.name === 'MongoServerError') return new ConflictError(message);

  return err;
};

module.exports = { validationError };
