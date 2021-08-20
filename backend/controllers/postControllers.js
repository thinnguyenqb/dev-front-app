const Posts = require('../models/postModel')

const postCtrl = {
  createPost: async (req, res) => {
    try {
      const { content, images } = req.body
      
      const newPost = new Posts({
        content, images
      })
      await newPost.save()

      res.json({
        msg: 'create Post!',
        newPost
      })
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  }
}

module.exports = postCtrl