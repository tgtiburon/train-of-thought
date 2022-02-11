

const router = require('express').Router();

// Implement the controller methods
// We are deconstructing user-controller to get
// just the things we need...
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser, 
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// Set up GET ALL and POST at /api/users
router 
    .route('/')
    .get(getAllUser)
    .post(createUser);


// Set up GET one, PUT, DELETE at /api/user/:id
router  
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);


// POST  /api/users/<userId>/<friendId>

router  
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);
    




module.exports = router;


