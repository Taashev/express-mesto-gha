const User = require('../models/user');
const { checkError } = require('./checkError');
const { NotFoundError } = require('../components/NotFoundError');

const notFoundUser = new NotFoundError('Такого пользователя не существует');

const doesUserExist = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId, (err, user) => {
    if (user === null) {
      next(checkError(notFoundUser));
      return;
    }

    next();
  });
};

module.exports = {
  doesUserExist,
};
