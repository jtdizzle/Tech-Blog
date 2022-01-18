const router = require('express').Router();
const userRoutes = require('./user-Routes');
const postRoutes = require('./post-Routes');


router.use('/users', user-Routes);
router.use('/posts', post-Routes);


module.exports = router;