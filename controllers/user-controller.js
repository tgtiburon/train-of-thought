
const { User, Thought } = require('../models');
//const { db } = require('../models/User');

const userController = {
    // Functions will go in here
    // Because these methods will be used as callback functions
    // we will use req and res
    // get all users

    // GET /api/users
    getAllUser(req, res) {
        User.find({})
       
            // update the query to not include __v either
            .select('-__v')
            // lets sort the query by ages of the post
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    
    // Get one User by id
    // GET /api/users/:id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        // JOin
            .populate({
                path: 'thoughts',
                // controls what is shown
                // select:('-__v username')
                select: ('-__v')
            })
            .populate({
                path: 'friends',
                // controls what is shown
                // select:('-__v username')
                select: ('-__v')
            })
            // selects which userData is shown
            .select(('-__v'))
            .then(dbUserData => {
                // if no user found 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!'}) ;
                    return;
                }
                // found user return json
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData =>  {
               
               res.json(dbUserData);
            })
            .catch(err=> {
                res.status(400).json( { message: 'Problem creating username. Name possibly already taken.'});
            
            });
    },

    // update user by ID
    //  PUT /api/users/:id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new:true, runValidators: true })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!'});
                    return;
                }
                res.json(dbUserData);

            })
            .catch(err => { 
                res.status(400).json(err)
            });

    },
    // delete user
    // DELETE  /api/users/:id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if(!dbUserData) {
                res.status(404).json({ message: 'No user with this id!' });
                return;
                }
              
                User.updateMany(
                    { _id: { $in: dbUserData.friends } },
                    // Uses pull to remove the id from friend array
                    { $pull: { friends: params.id } }
                )
                    .then(() => {
                        // Delete the thoughts that have that user's id
                        Thought.deleteMany(
                       
                             { _id: {$in: dbUserData.thoughts }}
                            )
                     
                        .then(()=> {
                            res.json({ message: "User and associated thoughts deleted" });
                        })
                        // Catch for thought.deleteMany
                            .catch((err) => {
                                console.log("Failed to remove thought associated with deleted user.");
                                res.status(400).json(err);
                            });
                        
                    })
                    // Catch for User.updateMany
                        .catch((err) => {
                            console.log("Failed to delete friend associated with that user.");
                            res.status(400).json(err);
                        });

            })
            // Catch for findOneAndDelete
            .catch(err => {
                console.log("Failed to find and delete user");
                res.status(400).json(err);
            })
    },

  
     // add Friend
     //  POST /api/users/:userId/friends/:friendId
     addFriend({ params }, res) {
    
        User.findOneAndUpdate(
            { _id: params.userId },
            // $addToSet only adds if not already there
            { $addToSet: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                // no user found
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
          
                res.json(dbUserData);
            })
            .catch(err => {
                res.json(err);
            })
    },
    
     // remove  Friend
     // DELETE /api/users/:userId/friends/:friendId

     deleteFriend({ params }, res) {
    
       User.findOneAndUpdate(
           { _id: params.userId },
           { $pull: { friends: params.friendId } },
           { new: true }
       )
           .then(dbUserData => {
               // no user
               if(!dbUserData) {
                   res.status(404).json({ message: 'No user found with this id!' });
                   return;
               }
              // User found
               res.json(dbUserData);
           })
           .catch(err => {
               res.json(err);
           })
   }
     
};



module.exports = userController;