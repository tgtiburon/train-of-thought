const router = require('express').Router();
const { 
        // remove first one
        getAllThought,
        addThought, 
        removeThought 
    
    } = require('../../controllers/thought-controller');
// remove for debugging
// GET /api/thoughts/
router 
    .route('/')
    .get(getAllThought)
// POST /api/thoughts/<userId> 
router.route('/:userId').post(addThought);

// DELETE /api/thoughts/<userId>/<thoughtId>
// need both params because we need to know the comment and the user it 
// came from
router  
    .route('/:userId/:thoughtId')
    .put(addThought)
    .delete(removeThought);


    // TODO: reactions
// DELETE reaction
// It's restful to include the userId (parent resource) as well as the reactionId
// router  
//     .route('/:userId/:reactionId')
//     .delete(removeReaction);


module.exports = router;