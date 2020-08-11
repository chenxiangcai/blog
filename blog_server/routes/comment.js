const comment = require('express').Router();
comment.get('/count',require('./admin/comment/count'));
comment.get('/new',require('./admin/comment/new'));
comment.get('/',require('./admin/comment/list'));
comment.put('/:id',require('./admin/comment/update'));
comment.delete('/:id',require('./admin/comment/delete'));
comment.post('/', require('./admin/comment/add'));
module.exports = comment;