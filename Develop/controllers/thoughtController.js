const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single thought by its ID
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.id })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: '😅 No thought with that ID 😅' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thought: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: '🎉 Thought created 🎉, but found 😅 No user with that Username 😅',
            })
          : res.json({
            message: '🎉 Thought Created 🎉',
          
        }))
      .catch((err) => res.status(500).json(err));
  },

  // Update a thought by its ID
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: '😅 No thought with this ID 😅' })
          : res.json({
            message: '✅ Thought Updated ✅',
            thought: thought})
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a thought by its ID
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: '😅 No thought with that ID 😅' })
          : res.json({ message: '☠️ Thought deleted ☠️' })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Add a reaction to a thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: '😅 No thought with this ID 😅' })
          : res.json({
            message: '💚 Reaction Added 💚',
            thought: thought})
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove a reaction from a thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: '😅 No thought with this ID 😅' })
          : res.json({
            message: '💔 Reaction Removed 💔'})
      )
      .catch((err) => res.status(500).json(err));
  },
};
