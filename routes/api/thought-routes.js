const router = require('express').Router();
const { 
        // remove first one
        getAllThought,
        getThoughtById,
        addThought, 
        removeThought,
        addReaction,
        removeReaction 
    
    } = require('../../controllers/thought-controller');
    // TODO: remove later
// remove for debugging
// GET /api/thoughts/
router 
    .route('/')
    .get(getAllThought)

// GET /api/thoughts/:thoughtId
router  
    .route('/:thoughtId')
    .get(getThoughtById)


// POST /api/thoughts/<userId> 
router.route('/:userId').post(addThought);

// DELETE /api/thoughts/<userId>/<thoughtId>
// need both params because we need to know the comment and the user it 
// came from
router  
    .route('/:userId/:thoughtId')
  //  .put(addReaction)
    .delete(removeThought);


    // TODO: reactions
// DELETE reaction
// It's restful to include the thoughtId (parent resource) as well as the reactionId
 router  
     .route('/:thoughtId/reactions/:reactionId')
     .delete(removeReaction);

// PUT addReaction
router 
    .route('/:thoughtId/reactions/')
    .put(addReaction);


module.exports = router;