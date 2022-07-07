const jwt = require('jsonwebtoken');
const Unauthorized = require('../components/UnauthorizedError');

const authError = new Unauthorized('Необходима авторизация');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(authError);
  }

  const token = authorization.replace('Bearer ', '');

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
