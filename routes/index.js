const router = require('express').Router();


// Import all API routes from /api/index.js
// we don't need to import from index.js because 
// it is implied
const apiRoutes = require('./api');

// Add /api prefix to all api routes directed from the 'api' directory
router.use('/api', apiRoutes);


// Fall through error message
router.use((req,res)=> {
    res.status(404).send('<h1> 404 Error </h1>');
});


module.exports = router;