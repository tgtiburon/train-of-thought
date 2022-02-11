
const { Thought, User } = require('../models');

const thoughtController = {
    // Functions will go in here
    // Because these methods will be used as callback functions
    // we will use req and res

    // add thought to user
    addThought({  body }, res) {
       // console.log(body);
       Thought.create(body)
       // TODO: Maybe use just body??

            .then(({ _id }) => {
                console.log('------------------------------------------')
                console.log('_id ====>' ,_id);
                console.log(body);
                return User.findOneAndUpdate(
                    { _id:body.userId },
                    // $push adds to the array
                    { $push: { thoughts: _id } },
                    // returning the user promise so we can do something
                    // with the results
                    { new: true, runValidators: true }
                );
            })
            .then((dbUserData) => {
                if(!dbUserData) {
                  return res.status(404).json({ message: 'No user with that id found!'});
                    
                }
                // returning the updated userdata
               // console.log('userdata ' , dbUserData);
               // res.status(200).json(dbUserData);
                res.json({ message: 'Thought successfully created.'});
            })
            .catch(err => {
                res.json(err);
            })
    },
    // api/thoughts/:id 
     // add thought to user
     updateThought({ params, body }, res) {
       // console.log(body);
      //  console.log(params);
        Thought.findOneAndUpdate(
            {_id: params.thoughtId },
            {$set: body},
            {new: true , runValidators: true}

        )
            // .populate({
            //     path: 'reactions',
            //     select: '-__v'
            // })
           // .select('-__v')

            .then((dbThoughtData)  => {
               // console.log(dbThoughtData);
               if(!dbThoughtData) {
                   res.status(404).json({ message: 'No thought with that id found!'});
                   return;
               }
              // res.json(dbThoughtData);
              res.json({ message: 'Thought successfully updated.'});
            })
            // .then(dbUserData => {
            //     if(!dbUserData) {
            //         res.status(404).json({ message: 'No user with that id found!'});
            //         return;
            //     }
            //     // returning the updated userdata
            //     res.json(dbUserData);
            // })
            .catch(err => {
                res.status(400).json(err);
            })
    },





    // remove Thought from user
    // TODO:   Why with the { params }    instead of req?  Save memory? Faster?
    removeThought({ params }, res) {
        console.log(params);
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
               
                if(!deletedThought) {
                    res.status(404).json({ message: 'No thought with this id!' });
                    return;
                }
           

                 User.findOneAndUpdate( 
                     // TODO: _id: ? userId or userName or thoughtId
                     { thoughts: params.thoughtId },
                     // removes that specific thought with $pull
                     { $pull: { thoughts: params.thoughtId } },
                     { new: true }
                 )
                 // This then was wrong!!
                 .then(dbUserData => {
                    if(!dbUserData) {
                        res.status(404).json({ message: 'No user with that id found!' } );
                        return;
                    }
                    res.json({ message: 'Thought and ties to user deleted. ' });
                })

            })
           
            .catch(err => res.json(err));
        
    } ,   // For testing adding get all thoughts below
    // TODO: remove later
    getAllThought(req, res) {
        Thought.find({})
            .sort({ _id: -1 })
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
     //   console.log('========================')  ;
      //  console.log(params);
      //  console.log(params.reactionId);
      //  console.log(params.thoughtId)   ;
        Thought.findOneAndUpdate(
            { _id: params.thoughtId }, 
            { $push: { reactions: body } },
            { new: true}  //, runValidators: true }
        )
            .populate({
                path:'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                //No user
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' } );
                    return;
                }
                res.json(dbThoughtData);
            
            })
            .catch(err => {
                res.json(err);
            })
    },
    removeReaction({ params }, res) {
        console.log(params);
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            // We are us9ing mongo $pull to remove the specific
            // reaction from the reaction array
            { $pull: { reactions:{ reactionId: params.reactionId  }} },
            { new: true }
        )
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with that id!'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    }


};



module.exports = thoughtController;