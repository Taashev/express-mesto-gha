const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regexUrl } = require('../utils/constants');
const {
  getUsers,
  getUser,
  getUserInfo,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

// get users
router.get('/', getUsers);

// get user info
router.get('/me', getUserInfo);

// get user
router.get('/:userId', getUser);

// update profile
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

// update avatar
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regexUrl),
  }),
}), updateAvatar);

module.exports = router;
