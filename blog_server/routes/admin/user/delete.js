const { User } = require('../../../model/User')
const { Post } = require('../../../model/Post')
const { Comment } = require('../../../model/Comment')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util') // 方法改造为返回promise对象
const unlink = promisify(fs.unlink)
module.exports = async (req, res) => {
  const id = req.params.id
  if (id.indexOf('-') != -1) {
    const ids = id.split('-')
    // 遍历删除
    for (const id of ids) {
      const user = await User.findOneAndDelete({ _id: id })
      // 删除头像
      if (user.avatar) await unlink(path.join(__dirname, '../', '../', '../', 'public', user.avatar))
      // 删除用户名下关联的文章
      await Post.deleteMany({ author: id })
      // 删除用户名下关联的评论
      await Comment.deleteMany({ author: id })
    }
    res.send({ message: '删除成功' })
  } else {
    // 删除用户、用户头像
    const user = await User.findOneAndDelete({ _id: id })
    if (user.avatar) await unlink(path.join(__dirname, '../', '../', '../', 'public', user.avatar))// 删除头像
    // 删除用户名下关联的文章
    await Post.deleteMany({ author: id })
    // 删除用户名下关联的评论
    await Comment.deleteMany({ author: id })
    res.send({ message: '删除用户成功' })
  }
}
