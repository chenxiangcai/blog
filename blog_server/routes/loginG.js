const { User } = require('../model/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/key')

module.exports = async (req, res) => {
  const token = req.headers.authorization
  jwt.verify(token, secret, async function (err, decode) {
    if (err) {
      res.json({
        msg: '当前用户未登录',
        status: -1
      })
    } else {
      // 证明用户已经登录
      console.log(decode)
      const { email } = decode
      const user = await User.findOne({ email })
      if (user.role !== 'admin') {
        return res.send({
          status: 0,
          msg: '普通用户',
          user
        })
      }
      res.send(user)
    }
  })
  /* console.log(req.headers.authorization)
  const token = req.headers.authorization.split(' ').pop()
  if (token === null) return res.send('err')
  console.log(jwt.verify(token, secret))
  const { _id, email } = jwt.verify(token, secret)
  console.log(_id, email)
  const user = await User.findOne({ email })
  if (user.role !== 'admin') {
    return res.send({
      status: 0
    })
  }
  res.send(user) */
}
