

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
    .put(addFriend)
    .delete(deleteFriend);
    




module.exports = router;


/* 

This allows us to: 
    1. not create duplicate routes
    2. abstracts the database methods from the routes giving us
        the options to write unit tests with jest

// this code
router.route('/').get(getCallbackFunction).post(postCallbackFunction);

// is this same as this
router.get('/', getCallbackFunction);
router.post('/' postCallbackFunction);


*/