const slide = require('express').Router();
slide.post('/',require('./admin/silde/add'));
slide.get('/',require('./admin/silde/list'));
slide.delete('/:id',require('./admin/silde/delete'));
module.exports = slide;
