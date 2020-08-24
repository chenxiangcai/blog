const { Post, validatePost } = require('../../../model/Post')
module.exports = async (req, res) => {
  console.log(req)
  const { error } = validatePost(req.fields)
  if (error) return res.send({ message: error.message })
  let post = await Post.findOne({ title: req.fields.title })
  if (post) return res.send({ message: '此标题已存在' })
  if (req.fields.createAt == 0) req.fields.createAt = Date.now()
  /* //自定义时间格式
    req.fields.createAt = new Date().toLocaleDateString() +' '+ new Date().toLocaleTimeString(); */
  post = new Post(req.fields)
  await post.save()
  res.send(post)
}
