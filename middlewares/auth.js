const jwt = require('jsonwebtoken');
const Unauthorized = require('../components/UnauthorizedError');

const authError = new Unauthorized('Необходима авторизация');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { cookie } = req.headers;

  if (!cookie || !cookie.startsWith('jwt=')) {
    return next(authError);
  }

  const token = cookie.replace('jwt=', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    return next(authError);
  }

  req.user = payload;

  next();
};

module.exports = auth;
