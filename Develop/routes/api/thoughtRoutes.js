const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

// Thought routes
router.route('/').get(getAllThoughts).post(createThought);
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);
router.route('/:id/reactions').post(addReaction);
router.route('/:id/:reactionId').delete(removeReaction);

module.exports = router;
