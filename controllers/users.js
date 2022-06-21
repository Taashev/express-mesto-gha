const User = require('../models/user');
const { checkError } = require('../modules/checkError');
const { messageError } = require('../utils/constants');

// get users
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => next(checkError(err)));
};

// get user
const getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => res.send({ user }))
    .catch((err) => next(checkError(err, messageError.userIdError)));
};

// create user
const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch((err) => next(checkError(err, messageError.userValidationError)));
};

// update profile
const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ user }))
    .catch((err) => next(checkError(err, messageError.userValidationError)));
};

// update avatar
const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ user }))
    .catch((err) => next(checkError(err, messageError.userValidationError)));
};

// export
module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
