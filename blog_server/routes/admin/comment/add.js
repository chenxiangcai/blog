const { Comment, validateComment } = require('../../../model/Comment')
const { Post } = require('../../../model/Post')
const jwt = require('jsonwebtoken')
const { secret } = require('../../../config/key')
module.exports = async (req, res) => {
  const token = req.headers.authorization
  jwt.verify(token, secret, async function (err, decode) {
    if (err) return res.send({ message: '请先登录' })
    else {
      // 证明用户已经登录
      const { _id } = decode // 解密出加密的token信息 用户id 保存到req请求中
      req.fields.author = _id
      const { error } = validateComment(req.fields)
      if (error) return res.send({ message: error.message })
      const comment = new Comment(req.fields)
      await comment.save()
      const post = await Post.findOne({ _id: req.fields.post })
      // 修改评论数量
      post.meta.comments = post.meta.comments + 1
      await post.save()
      res.send(comment)
    }
  })
}
