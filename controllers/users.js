const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../components/NotFoundError');
const { validationError } = require('../middlewares/validationError');
const { messageError } = require('../utils/constants');

// login
const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const id = user._id;
      const token = jwt.sign({ id }, 'secret-key', { expiresIn: '7d' });

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7, // 7 дней
        httpOnly: true,
        sameSite: true,
      }).end();
    })
    .catch(next);
};

// create user
const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => res.send({
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
    }))
    .catch((err) => next(validationError(err, err.name === 'MongoServerError' ? 'Этот email уже занят' : messageError.userValidationError)));
};

// get users
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

// get user
const getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (user === null) {
        return next(validationError(new NotFoundError('Такого пользователя не существует')));
      }

      res.send(user);
    })
    .catch((err) => next(validationError(err, messageError.userIdError)));
};

// get user info
const getUserInfo = (req, res, next) => {
  const userId = req.user.id;

  User.findById(userId)
    .then((user) => res.send(user))
    .catch(next);
};

// update profile
const updateProfile = (req, res, next) => {
  const userId = req.user.id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => next(validationError(err, messageError.userValidationError)));
};

// update avatar
const updateAvatar = (req, res, next) => {
  const userId = req.user.id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => next(validationError(err, messageError.userValidationError)));
};

// export
module.exports = {
  login,
  getUsers,
  getUser,
  getUserInfo,
  createUser,
  updateProfile,
  updateAvatar,
};
