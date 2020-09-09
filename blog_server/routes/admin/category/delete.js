const { Category } = require('../../../model/Category')
const { Post } = require('../../../model/Post')
const { Comment } = require('../../../model/Comment')
module.exports = async (req, res) => {
  const id = req.params.id
  if (id.indexOf('-') != -1) {
    const ids = id.split('-')
    for (const id of ids) {
      // 删除分类
      await Category.findOneAndDelete({ _id: id })
    }
    // 删除分类下关联的文章
    await Post.deleteMany({ category: id })
    // 删除文章下的评论
    const posts = await Post.find({ category: id }).select('_id')
    for (const _id of posts) {
      await Comment.findOneAndDelete({ post: _id })
    }
    res.send({ message: '删除成功' })
  } else {
    // 删除分类
    await Category.findOneAndDelete({ _id: id })
    // 删除分类下关联的文章
    await Post.deleteMany({ category: id })
    // 删除文章下的评论
    const posts = await Post.find({ category: id }).select('_id')
    for (const _id of posts) {
      await Comment.findOneAndDelete({ post: _id })
    }
    res.send({ message: '删除成功' })
  }
}
