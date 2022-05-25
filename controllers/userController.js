const { User, Thought } = require('../model');


module.exports = {
    // Get all Users
    // Get all Users
  getUsers(req, res) {
    User.find()
      .then((Users) => res.json(Users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a User
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((User) =>
        !User
          ? res.status(404).json({ message: 'No User with that ID' })
          : res.json(User)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a User
  createUser(req, res) {
    User.create(req.body)
      .then((User) => res.json(User))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a User
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((User) =>
        !User
          ? res.status(404).json({ message: 'No User with that ID' })
          : User.deleteMany({ _id: { $in: User.Users } })
      )
      .then(() => res.json({ message: 'User and Users deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a User
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((User) =>
        !User
          ? res.status(404).json({ message: 'No User with this id!' })
          : res.json(User)
      )
      .catch((err) => res.status(500).json(err));
  },
  
    // Add an friend to a User
    addfriend(req, res) {
      console.log('You are adding an friend');
      console.log(req.body);
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { "friends": req.params.friendId } },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res
                .status(404)
                .json({ message: 'No User found with that ID :(' })
                : res.json('friend added🎉')
                )
        .catch((err) => res.status(500).json(err));
    },
    // Remove friend from a User
    removefriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { "friends": req.params.friendId } },
        { runValidators: true, new: true }
      )
        .then((User) =>
          !User
            ? res
                .status(404)
                .json({ message: 'No User found with that ID :(' })
            : res.json(User)
        )
        .catch((err) => res.status(500).json(err));
    },
  };
  