const { User, validateLogin } = require('../../model/User')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/key')
module.exports = async (req, res) => {
  const { error } = validateLogin(req.fields)
  if (error) {
    return res.send({
      meta: { status: 400, message: error.message }
    })
  }
  const user = await User.findOne({ email: req.fields.email })
  if (!user) {
    return res.send({
      meta: { status: 400, message: '账号或密码错误！' }
    })
  }
  if (!await bcrypt.compare(req.fields.password, user.password)) {
    return res.send({
      meta: { status: 400, message: '账号或密码错误！' }
    })
  }

  // 根据用户的身份进行返回 跳转不同的首页
  if (user.role === 'admin') var path = { name: 'adminHome' }
  else path = { name: 'home' }

  // 使用密钥对token加密生成 返回客户端
  const { _id, email } = user
  const token = jwt.sign({ _id, email }, secret, { expiresIn: '24h' })
  // const userInfo = _.pick(user, ['nickName', 'email', 'role', 'avatar', '_id', 'status', 'createTime'])
  res.send({ token, path, meta: { status: 200, message: '登录成功' } })
}
