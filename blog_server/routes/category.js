const category = require('express').Router();
category.get('/count',require('./admin/category/count'));
category.post('/',require('./admin/category/add'));
category.get('/',require('./admin/category/list'));
category.get('/:id',require('./admin/category/findOne'));
category.put('/:id',require('./admin/category/updateOne'));
category.delete('/:id',require('./admin/category/delete'));

module.exports = category;