const router = require('express').Router()
const postCtrl = require('../controllers/postControllers')
const auth = require('../middleware/auth')

//use the same path, different protocol
router.route('/posts')
  .post(auth, postCtrl.createPost)
  .get(auth, postCtrl.getPosts)

// router use update post
router.route('/post/:id')
  .patch(auth, postCtrl.updatePosts)
  
module.exports = router