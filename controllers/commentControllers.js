const Comments = require('../models/commentModel')
const Posts = require('../models/postModel')

const commentCtrl = {
  createComment: async (req, res) => {
    try {
      const { postId, content, tag, reply, postUserId } = req.body;

      const post = await Posts.findById(postId)
      if (!post) return res.status(400).json({ msg: "This post does not exist"})
      
      if (reply) {
        const cm = await Comments.findById(reply)
        if(!cm) return res.status(400).json({msg: "This comment does not exist"})
      }

      const newComment = new Comments({
        user: req.user._id, content, tag, reply, postUserId, postId
      })

      await Posts.findOneAndUpdate({ _id: postId }, {
        $push: {comments: newComment._id}
      })

      await newComment.save()

      res.json({newComment})
      
    } catch (err) {
      return res.status(500).json({ msg: err.message }); //server err
    }
  },
  updateComment: async (req, res) => {
    try {
      const { content } = req.body
      await Comments.findOneAndUpdate({
        _id: req.params.id, user: req.user._id
      }, { content })
      
      res.json({msg: 'Update Success!'})
    } catch (err) {
      
    }
  },
  likeComment: async (req, res) => {
    try {
      const post = await Comments.find({
        _id: req.params.id,
        likes: req.user._id,
      });
      if (post.length > 0)
        return res.status(400).json({ msg: "You liked this comment." });

      const like = await Comments.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      );

      if (!like)
        return res.status(400).json({ msg: "This comment does not exist." });

      res.json({ msg: "Liked Post!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  unLikeComment: async (req, res) => {
    try {
      const like = await Comments.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );

      if (!like)
        return res.status(400).json({ msg: "This comment does not exist." });

      res.json({ msg: "UnLiked comment!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const comment = await Comments.findOneAndDelete({
        _id: req.params.id,
        $or: [
          {user: req.user._id},
          {postUserId: req.user._id}
        ]
      })
      await Posts.findOneAndUpdate({_id: comment.postId}, {
        $pull: {comments: req.params.id}
      })
      res.json({msg: 'Deleted Comment!'})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
}
  

module.exports = commentCtrl;