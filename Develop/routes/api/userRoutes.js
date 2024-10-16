const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// GET all users
router.route('/').get(getAllUsers).post(createUser);

// GET a single user by their ID
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

// POST and DELETE routes for friends
router.route('/:id/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
