const { HttpError } = require('../components/HttpError');

const checkError = (err, message) => {
  switch (err.name) {
    case 'CastError':
      return new HttpError(message);
    case 'ValidationError':
      return new HttpError(message);
    default:
      return err;
  }
};

module.exports = { checkError };
