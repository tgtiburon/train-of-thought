
const { User, Thought } = require('../models');
const { db } = require('../models/User');

const userController = {
    // Functions will go in here
    // Because these methods will be used as callback functions
    // we will use req and res
    // get all users

    // GET /api/users
    getAllUser(req, res) {
        User.find({})
        // TODO: shows thoughts?

          //.populate({
               // path: 'thoughts',
              //  path: 'friends',
                // Don't select __v. must select -__V
              //  select: '-__v'  


          //  }) 
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
    // make a call to  PUT /api/pizzas/:id
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
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if(!dbUserData) {
                res.status(404).json({ message: 'No user with this id!' });
                return;
                }
                // Removes all thoughts tied to the user we are deleting
                // Thought.deleteMany(
                //     { username: dbUserData.username }
                //     )
                User.updateMany(
                    { _id: { $in: dbUserData.friends } },
                    { $pull: { friends: params.id } }
                )

                    .then(() => {
                        
                        console.log("dbuserdata.friends=====>", dbUserData.friends);
                        console.log(dbUserData);
                        // uses $pull to delete the user id from their friend's friend array
                        // updateMany ( <filter>, <update> )
                        // User.updateMany(
                        //     { _id: { $in: dbUserData.friends } },
                        //     { $pull: { friends: params.id } }
                        // )
                        Thought.deleteMany(
                          //  { username:{ $in: dbUserData.username }}
                             { _id: {$in: dbUserData.thoughts }}
                            )
                     
                        .then(()=> {
                            res.json({ message: "User and associated thoughts deleted" });
                        })
                        // Catch for User.updateMany
                            .catch((err) => {
                                console.log("Failed to remove friends associated with deleted user.");
                                res.status(400).json(err);
                            });
                        
                    })
                    // Catch for Thought.deleteMany
                        .catch((err) => {
                            console.log("Failed to delete thoughts.");
                            res.status(400).json(err);
                        });

            })
            // Catch for findOneAndDelete
            .catch(err => {
                console.log("Failed to find and delete user");
                res.status(400).json(err);
            })
    },

    // TODO: working on this
     // add Friend
     addFriend({ params }, res) {
    
        User.findOneAndUpdate(
            { _id: params.userId },
            // try $addToSet
            { $addToSet: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                // no pizza
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
     deleteFriend({ params }, res) {
    
       User.findOneAndUpdate(
           { _id: params.userId },
           { $pull: { friends: params.friendId } },
           { new: true }
       )
           .then(dbUserData => {
               // no pizza
               if(!dbUserData) {
                   res.status(404).json({ message: 'No user found with this id!' });
                   return;
               }
               // pizza found
               console.log("Should be greg");
               console.log(dbUserData);
               res.json(dbUserData);
           })
           .catch(err => {
               res.json(err);
           })
   }
     


};



module.exports = userController;