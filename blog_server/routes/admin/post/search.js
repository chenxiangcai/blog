const { Post } = require('../../../model/Post')
module.exports = async (req, res) => {
  const key = req.params.key
  // 如果用户输入了搜索关键字
  if (key.trim().length > 0) {
    const regex = new RegExp(escapeRegex(key), 'gi') // 全局匹配规则
    const posts = await Post.find({ title: regex }).populate('author', '-password').populate('category')
    res.send(posts)
  } else {
    res.send({ message: '请输入搜索关键字' })
  }
}
function escapeRegex (text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}
