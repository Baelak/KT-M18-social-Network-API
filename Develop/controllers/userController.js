const { User } = require('../models');

module.exports = {
  // Get all users
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single user by their ID
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: '😅 No user with that ID 😅' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json({
        message: '🎉 User Account Created 🎉',
      user: user
    }))
      .catch((err) => res.status(500).json(err));
  },

  // Update a user by their ID
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: '😅 No user with this ID 😅' })
          : res.json({
            message: '✅ Username Updated ✅',
          user: user
        }))
      .catch((err) => res.status(500).json(err));
  },

  // Delete a user by their ID
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: '😅 No user with that ID 😅' })
          : res.json({ message: '☠️ User deleted ☠️' })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Add a friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: '😅 No user with this ID 😅' })
          : res.json({
            message: '🤗 Friend Added 🤗',
          user: user
        })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove a friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this ID 😅' })
          : res.json({
            message: '🥲 Friend Removed 🥲'})
      )
      .catch((err) => res.status(500).json(err));
  },
};
