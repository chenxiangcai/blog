const { Post } = require('../../../model/Post')
const { Comment } = require('../../../model/Comment')
module.exports = async (req, res) => {
  const id = req.params.id
  // 查询文章对应的评论 并且只返回已审核的评论
  const comment = await Comment.find({ post: id, state: 1 })
    .populate('author', '-password')
    .populate('post')
  const post = await Post.findOne({ _id: id }).populate('author', '-password').populate('category').exec()
  // 增加文章阅读数量
  post.meta.views = post.meta.views + 1
  await post.save()
  return res.send({ post, comment })
}
