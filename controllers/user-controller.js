
const { User } = require('../models');

const userController = {
    // Functions will go in here
    // Because these methods will be used as callback functions
    // we will use req and res
    // get all users

    // GET /api/users
    getAllUser(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                // Don't select __v. must select -__V
                select: '-__v'  


            }) 
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
            .then(dbUserData => res.json(dbUserData))
            .catch(err=> res.status(400).json(err));
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
                res.json(dbUserData);
            })
            .catch(err => {
                //console.log(err);
                res.status(400).json(err);
            })
    },

    // TODO: working on this
     // add Friend
     addFriend({ params }, res) {
       //  console.log('----------------------------------------------------');
       //  console.log("In addFriend()")
      //   console.log(params);
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
                // pizza found
            //    console.log("Should be greg");
            //    console.log(dbUserData);
                res.json(dbUserData);
            })
            .catch(err => {
                res.json(err);
            })
    },
      // TODO: working on this
     // remove  Friend
     deleteFriend({ params }, res) {
      //  console.log('----------------------------------------------------');
      //  console.log("In removeFriend()")
      //  console.log(params);
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