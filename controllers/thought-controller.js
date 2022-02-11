
const { Thought, User } = require('../models');

const thoughtController = {
    // Functions will go in here
    // Because these methods will be used as callback functions
    // we will use req and res

    // add thought to user
    // POST /api/thoughts/
    addThought({  body }, res) {
       
       Thought.create(body)
    
            .then(({ _id }) => {
              // Push the thoughtId onto the user object
                return User.findOneAndUpdate(
                    { _id:body.userId },
                    // $push adds to the array
                    { $push: { thoughts: _id } },
                    { new: true, runValidators: true }
                );
            })
            .then((dbUserData) => {
                if(!dbUserData) {
                  return res.status(404).json({ message: 'No user with that id found!'});
                    
                }
            
                res.json({ message: 'Thought successfully created.'});
            })
            .catch(err => {
                // thought failed
                res.json(err);
            })
    },
    // api/thoughts/:id 
     // add thought to user
     updateThought({ params, body }, res) {
   
        Thought.findOneAndUpdate(
            {_id: params.thoughtId },
            {$set: body},
            {new: true , runValidators: true}

        )
         
            .then((dbThoughtData)  => {
                // no thought found
               if(!dbThoughtData) {
                   res.status(404).json({ message: 'No thought with that id found!'});
                   return;
               }
              // thought updated
              res.json({ message: 'Thought successfully updated.'});
            })
            .catch(err => {
                res.status(400).json(err);
            })
    },


    // remove Thought from user
  
    // DELETE /api/thoughts/:thoughtId
    removeThought({ params }, res) {
        console.log(params);
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
               
                if(!deletedThought) {
                    res.status(404).json({ message: 'No thought with this id!' });
                    return;
                }
                // Find the user with the thought
                 User.findOneAndUpdate( 
                    
                     { thoughts: params.thoughtId },
                     // removes that specific thought with $pull
                     { $pull: { thoughts: params.thoughtId } },
                     { new: true }
                 )
                 .then(dbUserData => {
                    if(!dbUserData) {
                        res.status(404).json({ message: 'No user with that id found!' } );
                        return;
                    }
                    res.json({ message: 'Thought and ties to user deleted. ' });
                })

            })
           
            .catch(err => res.json(err));
        
    } ,   


   // GET /api/thoughts/
    getAllThought(req, res) {
        Thought.find({})
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // GET /api/thoughts/:thoughtId
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
    // POST /api/thoughts/:thoughtId/reactions/
    addReaction({ params, body }, res) {
        // Find the thought and push the reaction body on to it.
        Thought.findOneAndUpdate(
            { _id: params.thoughtId }, 
            { $push: { reactions: body } },
            { new: true, runValidators: true}  
        )
        // Join the reaction schema to the thought
            .populate({
                path:'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                //No thought
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' } );
                    return;
                }
                // worked 
                res.json(dbThoughtData);
            
            })
            .catch(err => {
                res.json(err);
            })
    },

    // DELETE  /api/thoughts/:thoughtId/reactions/:reactionId
    removeReaction({ params }, res) {
        console.log(params);
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            // We are using mongo $pull to remove the specific
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