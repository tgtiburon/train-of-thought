const res = require('express/lib/response');
const { User } = require('../models');

const userController = {
    // Functions will go in here
    // Because these methods will be used as callback functions
    // we will use req and res
    // get all users
    getAllUser(req, res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Get one User by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
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
        User.findOneAndUpdate({ _id: params.id }, body, { new:true })
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
    }


};



module.exports = userController;