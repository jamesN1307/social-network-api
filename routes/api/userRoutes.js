const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addfriend,
  removefriend,
} = require('../../controllers/userController')

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/users/:userId/friends
router.route('/:userId/friends').post(addfriend);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(removefriend);

module.exports = router;
