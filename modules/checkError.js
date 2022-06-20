const { HttpError } = require('../components/HttpError');

const checkError = (err, message) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') return new HttpError(message);

  return err;
};

module.exports = { checkError };
