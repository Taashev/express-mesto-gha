const User = require('../models/user');
const {
  HttpError,
  NotFound,
} = require('../utils/Errors');

const httpError = new HttpError('Переданы некорректные данные пользователя');
const idHttpError = new HttpError('Некорректный id');
const userNotFound = new NotFound('Такого пользователя не существует');

// get users
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => next(err));
};

// get user
const getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(userNotFound);
        return;
      }
      res.send(user);
    })
    .catch(() => next(idHttpError));
};

// create user
const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch(() => next(httpError));
};

// update profile
const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch(() => next(httpError));
};

// update avatar
const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch(() => next(httpError));
};

// export
module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
