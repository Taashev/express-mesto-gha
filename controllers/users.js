const User = require('../models/user');

// get users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => res.send({ message: `Произошла ошибка: ${err}` }));
};

// get user
const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => res.send({ user }))
    .catch((err) => res.send({ message: `Произошла ошибка: ${err}` }));
};

// create user
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((users) => res.send({ users }))
    .catch((err) => res.send({ message: `Произошла ошибка: ${err}` }));
};

// update profile
const updateProfile = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { name, about }, { new: true })
    .then((user) => res.send({ user }))
    .catch((err) => res.send({ message: `Произошла ошибка: ${err}` }));
};

// update avatar
const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { avatar }, { new: true })
    .then((user) => res.send({ user }))
    .catch((err) => res.send({ message: `Произошла ошибка: ${err}` }));
};

// export
module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
