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
    Thought.findOne({ _id: req.params.ThoughtId })
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
    Thought.findOneAndDelete({ _id: req.params.ThoughtId })
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
      { _id: req.params.ThoughtId },
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
  
    // Add an Reaction to a Thought
    addReaction(req, res) {
      console.log('You are adding an Reaction');
      console.log(req.body);
      Thought.findOneAndUpdate(
        { _id: req.params.ThoughtId },
        { $addToSet: { Reactions: req.body } },
        { runValidators: true, new: true }
      )
        .then((Thought) =>
          !Thought
            ? res
                .status(404)
                .json({ message: 'No Thought found with that ID :(' })
            : res.json(Thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Remove Reaction from a Thought
    removeReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.ThoughtId },
        { $pull: { Reaction: { ReactionId: req.params.ReactionId } } },
        { runValidators: true, new: true }
      )
        .then((Thought) =>
          !Thought
            ? res
                .status(404)
                .json({ message: 'No Thought found with that ID :(' })
            : res.json(Thought)
        )
        .catch((err) => res.status(500).json(err));
    },
  };
  