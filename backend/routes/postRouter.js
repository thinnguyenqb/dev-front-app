const router = require('express').Router()
const postCtrl = require('../controllers/postControllers')
const auth = require('../middleware/auth')

//use the same path, different protocol
router.route('/posts')
  .post(auth, postCtrl.createPost)
  .get(auth, postCtrl.getPosts)

// router use update post
router.route('/post/:id')
  .patch(auth, postCtrl.updatePost)
  .get(auth, postCtrl.getPost)
  .delete(auth, postCtrl.deletePost)
  
router.patch('/post/:id/like', auth, postCtrl.likePost)

router.patch('/post/:id/unlike', auth, postCtrl.unLikePost)

router.get('/user_posts/:id', auth, postCtrl.getUserPosts)

router.get('/post_discover', auth, postCtrl.getPostsDiscover)

module.exports = router