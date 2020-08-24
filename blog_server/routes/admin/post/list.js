const { Post } = require('../../../model/Post')
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
        { title: { $regex: reg } },
        { content: { $regex: reg } }
      ]
    }
  }

  if (req.query.category == '-1') req.query.category = undefined
  if (req.query.state == '-1') req.query.state = undefined
  if (req.query.category != undefined) condition.category = req.query.category
  if (req.query.state != undefined) condition.state = req.query.state
  console.log(condition)
  const data = await pagination(Post).page(page).size(pagesize).find(condition).populate('author', '-password').populate('category').select('-content -meta').exec()
  res.send({ data, meta: { status: 200, message: '查询成功' } })
}
