// 路由集合
module.exports = app => {
  // 管理员身份验证
  app.use('/admin/validate', require('./loginG'))
  // 用户二级路由
  app.use('/users', require('./user'))
  // 分类
  app.use('/categories', require('./category'))
  // 帖子
  app.use('/posts', require('./post'))
  // 评论
  app.use('/comments', require('./comment'))
  // 轮播
  app.use('/slides', require('./slide'))
  // 设置
  app.use('/settings', require('./setting'))

  // 用户登录
  app.post('/login', require('./admin/login'))
  // 判断用户是否为管理员登录
  app.get('/login/status', require('./admin/loginStatus'))
  // 用户登出
  app.post('/logout', require('./admin/logout'))
  // 头像上传
  app.post('/upload', require('./admin/user/avatar'))
}
