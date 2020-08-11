const post = require('express').Router();
post.get('/count',require('./admin/post/count'));
post.get('/newest',require('./admin/post/newest'));
post.get('/random',require('./admin/post/random'));
post.get('/category/:id',require('./admin/post/category'));
post.get('/recommend',require('./admin/post/recommend'));
post.get('/search/:key',require('./admin/post/search'));
post.post('/',require('./admin/post/add'));
post.post('/like/:id',require('./admin/post/like'))
post.get('/',require('./admin/post/list'));
post.get('/:id',require('./admin/post/findOne'));
post.put('/:id',require('./admin/post/update'));
post.delete('/:id',require('./admin/post/delete'));

module.exports = post;