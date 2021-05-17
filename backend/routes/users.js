/* eslint-disable linebreak-style */
const router = require('express').Router();
const {
  idValidation,
  userAvatarUpdateValidation,
  userInfoUpdateValidation,
} = require('../middlewares/requestValidation');
const {
  getUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', idValidation, getCurrentUser);
router.get('/:id', idValidation, getUser);
router.patch('/me', userInfoUpdateValidation, updateUserInfo);
router.patch('/me/avatar', userAvatarUpdateValidation, updateUserAvatar);

module.exports = router;
