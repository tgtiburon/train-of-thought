const { Thought, User } = require('../models');

const thoughtController = {
    // Functions will go in here
    // Because these methods will be used as callback functions
    // we will use req and res

    // add thought to user
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                console.log(_id);
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    // $push adds to the array
                    { $push: { thoughts: _id } },
                    // returning the user promise so we can do something
                    // with the results
                    { new: true }
                );
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user with that id found!'});
                    return;
                }
                // returning the updated userdata
                res.json(dbUserData);
            })
            .catch(err => {
                res.json(err);
            })
    },
    // remove Thought from user
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if(!deletedThought) {
                    return res.status(404).json({ message: 'No comment with this id!' });
                }
                return User.findOneAndUpdate( 
                    { _id: params.userId},
                    // removes that specific thought with $pull
                    { $pull: {thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user with that id found!' } );
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));

    }


};



module.exports = thoughtController;