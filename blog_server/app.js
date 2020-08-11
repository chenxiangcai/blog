const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const config = require('config');
const session = require('express-session');
const formidable = require('express-formidable');
require('./model/connect');
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
    secret:'secret key',
    resave: false,
    saveUninitialized: false
}))

console.log(config.get('title'));
if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'));
}else {
    console.log('当前是生产环境');
}

app.use(formidable({
    uploadDir: path.join(__dirname, 'public', 'uploads'),
    maxFileSize: 2 * 1024 * 1024,
    keepExtensions: true
}));

//路由
require('./routes')(app);
app.listen(80);
console.log('服务器启动成功')