const { User, Thought } = require('../model');


module.exports = {
    // Get all Thoughts
    // Get all Thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((Thoughts) => res.json(Thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a Thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: 'No Thought with that ID' })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((Thought) => res.json(Thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a Thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: 'No Thought with that ID' })
          : Thought.deleteMany({ _id: { $in: Thought.Thoughts } })
      )
      .then(() => res.json({ message: 'Thought and Thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: 'No Thought with this id!' })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  
    // add a reaction
    addReaction(req, res) {
      Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body }},
          {runValidators: true, new: true }
      )
          .then((thought) =>
              !thought
                  ? res.status(404).json({
                      message: 'reaction created, but found no thought with that ID',
                  })
                  : res.json(thought)
          )
          .catch((err) => {
              console.log(err);
              res.status(500).json(err);
          });
    },

        // delete a reaction
        removeReaction(req, res) {
          Thought.findOneAndUpdate(
              { _id: req.params.thoughtId },
              { $pull: { "reactions": req.params.reactionsId } },
              { new: true }
          )
              .then((thought) =>
                  !thought
                      ? res.status(404).json({
                          message: 'Video created, but found no user with that ID',
                      })
                      : res.json('delete the reaction :(')
              )
              .catch((err) => {
                  console.log(err);
                  res.status(500).json(err);

              });
},
}