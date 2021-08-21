const Posts = require('../models/postModel')

const postCtrl = {
  createPost: async (req, res) => {
    try {
      const { content, images } = req.body
      
      if (images.length === 0)
        return res.status(400).json({ msg: "Please add your photo." })
      
      const newPost = new Posts({
        content, images, user: req.user._id
      })
      await newPost.save()

      res.json({
        newPost: {
          ...newPost._doc,
          user: req.user
        }
      })
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  getPosts: async (req, res) => {
    try {
      const posts = await Posts.find({
        user: [...req.user.following, req.user._id]
      }).populate("user likes", "avatar username fullname") // only return the User (avatar username fullname)

      res.json({
        msg: 'Success!',
        result: posts.length,
        posts
      })
      
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  }
}

module.exports = postCtrl