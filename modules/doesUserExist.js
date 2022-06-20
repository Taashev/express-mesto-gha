const User = require('../models/user');

const doesUserExist = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId, (err, user) => {
    if (user === null) {
      res.send({ message: 'Такого пользователя не существует' });
      return;
    }

    next();
  });
};

module.exports = {
  doesUserExist,
};
