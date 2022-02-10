const router = require('express').Router();
const { 
        // remove first one
        getAllThought,
        getThoughtById,
        addThought,
        updateThought, 
        removeThought,
        addReaction,
        removeReaction 
    
    } = require('../../controllers/thought-controller');
    // TODO: remove later
// remove for debugging
// GET /api/thoughts/
router 
    .route('/')
    .post(addThought)
    .get(getAllThought);

// GET /api/thoughts/:thoughtId
router  
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);


// POST /api/thoughts/<userId> 
//router.route('/:userId').post(addThought);

// TODO: delete the below I think
// DELETE /api/thoughts/<userId>/<thoughtId>
// need both params because we need to know the comment and the user it 
// came from
//router  
  //  .route('/:userId/:thoughtId')
  //  .put(updateThought)
  //  .delete(removeThought);
// TODO: use this
// router  
//     .route('/:thoughtId')
//     .put(updateThought)
//     .delete(removeThought);


    // TODO: reactions
// DELETE reaction
// It's restful to include the thoughtId (parent resource) as well as the reactionId
 router  
     .route('/:thoughtId/reactions/:reactionId')
     .delete(removeReaction);

// PUT addReaction
router 
    .route('/:thoughtId/reactions/')
    // TODO: Should be a put?
   // .put(addReaction);
    .post(addReaction);


module.exports = router;