
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
        console.log(params);
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                console.log('-------------------------------');
                console.log(deletedThought);

                if(!deletedThought) {
                    return res.status(404).json({ message: 'No thought with this id!' });
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
        
    } ,   // For testing adding get all thoughts below
    // TODO: remove later
    getAllThought(req, res) {
        Thought.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    getThoughtById({params}, res) {
        Thought.findOne({ _id: params.thoughtId})
             .populate({
                 path: 'reactions',
                 select:'-__v'   
             })
            .select('-__v')
            .then(dbUserData =>  {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(404).json(err);
            });

       
    },
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId }, 
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            then(dbUserData => {
                //No user
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' } );
                    return;
                }
                res.json(dbUserData);
            
            })
            .catch(err => {
                res.json(err);
            })
    },
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            // We are us9ing mongo $pull to remove the specific
            // reaction from the reaction array
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbUserData => {
                res.json(dbUserData);
            })
            .catch(err => {
                res.json(err);
            })
    }


};



module.exports = thoughtController;