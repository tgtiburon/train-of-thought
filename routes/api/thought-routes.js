const router = require('express').Router();
const { 
        
    // Implement the controller methods
    // We are deconstructing user-controller to get
    // just the things we need...       
        getAllThought,
        getThoughtById,
        addThought,
        updateThought, 
        removeThought,
        addReaction,
        removeReaction 
    
    } = require('../../controllers/thought-controller');
 
// GET POST  /api/thoughts/
router 
    .route('/')
    .post(addThought)
    .get(getAllThought);

// GET PUT DELETE  /api/thoughts/:thoughtId
router  
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);


// It's restful to include the thoughtId (parent resource) as well as the reactionId

// DELETE  /api/thoughts/:thoughtiD/reactions/:reactionId
 router  
     .route('/:thoughtId/reactions/:reactionId')
     .delete(removeReaction);

     
// POST  /api/thoughts/:thoughtiD/reactions/
router 
    .route('/:thoughtId/reactions/')
    .post(addReaction);




module.exports = router;