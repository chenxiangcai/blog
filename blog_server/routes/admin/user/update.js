const { User, validateUser } = require('../../../model/User')
const _ = require('lodash')
module.exports = async (req, res) => {
  // 禁止修改邮箱
  req.fields = _.pick(req.fields, ['avatar', 'status', 'role', 'nickName'])
  const { avatar, status, role, nickName } = req.fields
  req.fields._id = req.params.id
  try {
    validateUser(req.fields)
  } catch (e) {
    return res.send({ message: e.message })
  }
  /* const findUser = await User.findOne({ email: req.fields.email })
  if (findUser) return res.send({ message: '此邮箱已被注册！' }) */
  const user = await User.updateOne({ _id: req.fields._id }, { avatar, status, role, nickName })
  res.send(user)
}
