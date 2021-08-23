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
  
router.patch('/post/:id/like', auth, postCtrl.likePost)
router.patch('/post/:id/unlike', auth, postCtrl.unLikePost)
module.exports = router