const { User } = require('../../../model/User')
const pagination = require('mongoose-sex-page')
const _ = require('lodash')
module.exports = async (req, res) => {
  let page = +req.query.page
  const pagesize = +req.query.pagesize
  let condition = {}
  if (!page || !_.isNumber(page)) page = 1

  if (req.query.query !== '') {
    /* condition.title = req.query.query */
    const reg = new RegExp(req.query.query)
    condition = {
      // 多字段匹配
      $or: [
        { email: { $regex: reg } },
        { nickName: { $regex: reg } }
      ]
    }
  }

  if (req.query.role == '-1') req.query.role = undefined
  if (req.query.status == '-1') req.query.status = undefined
  if (req.query.role != undefined) condition.role = req.query.role
  if (req.query.status != undefined) condition.status = req.query.status
  const user = await pagination(User).find(condition).page(page).size(pagesize).select('-password').sort('-createTime').exec()
  res.send({ user, meta: { status: 200, message: '查询成功' } })
}
