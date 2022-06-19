/* eslint-disable max-classes-per-file */
class HttpError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.name = 'BadRequest';
  }
}

class NotFound extends HttpError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = 'NotFound';
  }
}

module.exports = {
  HttpError,
  NotFound,
};
