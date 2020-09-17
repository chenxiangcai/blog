const express = require('express')
const compression = require('compression')
const app = express()
const path = require('path')
/* const session = require('express-session') */
const formidable = require('express-formidable')
require('./model/connect')
app.use(compression())
app.use(express.static(path.join(__dirname, 'public')))
/* app.use(session({
  secret: 'secret key',
  resave: false,
  saveUninitialized: false
})) */

// 设置跨域和相应数据格式
app.all('/*', function (req, res, next) {
  /* res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Request-Headers', '*') */
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
  )
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  if (req.method == 'OPTIONS') res.send(200)
  /* 让options请求快速返回 */ else next()
})

app.use(formidable({
  uploadDir: path.join(__dirname, 'public', 'uploads'),
  maxFileSize: 2 * 1024 * 1024,
  keepExtensions: true
}))

// 路由
require('./routes')(app)
app.listen(80)
console.log('服务器启动成功')
