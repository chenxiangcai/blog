const user = require('express').Router();

//用户添加
user.post('/',require('./admin/user/add'));
//用户列表
user.get('/',require('./admin/user/userList'));
//密码修改
user.put('/password',require('./admin/user/password'));
//根据id查询用户信息
user.get('/:id',require('./admin/user/findOne'));
//用户修改
user.put('/:id',require('./admin/user/update'));
//用户删除
user.delete('/:id',require('./admin/user/delete'));




module.exports = user;
