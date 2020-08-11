const { User } = require('../model/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/key')

module.exports = async (req, res, next) => {
  const token = req.headers.Authorization.split(' ').pop()
  console.log(jwt.verify(token, secret))
  const { _id, email } = jwt.verify(token, secret)
  console.log(_id, email)
  const user = await User.find({ email })
  if (user.role !== 'admin') return res.status(400)
  next()
  console.log(req)
  console.log(1)
}
