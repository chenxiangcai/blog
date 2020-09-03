const setting = require('express').Router()
setting.post('/', require('./admin/setting/add'))
setting.get('/', require('./admin/setting/find'))
module.exports = setting
