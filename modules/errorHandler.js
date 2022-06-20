const { HttpError } = require('../components/HttpError');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }

  res.status(500).send({ message: 'The end! :(' });
};

const notFound = (req, res) => {
  res.status(404).send({ message: 'Ресурс не найден' });
};

module.exports = {
  errorHandler,
  notFound,
};
