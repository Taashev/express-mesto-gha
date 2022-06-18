const router = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

// get users
router.get('/', getUsers);

// get user
router.get('/:userId', getUser);

// create user
router.post('/', createUser);

// update profile
router.patch('/me', updateProfile);

// update avatar
router.patch('/me/avatar', updateAvatar);

module.exports = router;
