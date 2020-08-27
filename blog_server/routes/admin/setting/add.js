const { Setting, validateSettings } = require('../../../model/Setting')
module.exports = async (req, res) => {
  const { error } = validateSettings(req.fields)
  if (error) return res.send({ message: error.message })
  await Setting.deleteMany({})// 清除现有设置
  const setting = new Setting(req.fields)
  await setting.save()
  res.send(setting)
}
