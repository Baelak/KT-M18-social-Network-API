const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// GET all users
router.route('/').get(getAllUsers).post(createUser);

// GET a single user by their ID
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser); // Ensure this is correctly defined

// POST and DELETE routes for friends
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
