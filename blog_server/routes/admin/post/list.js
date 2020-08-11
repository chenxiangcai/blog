const { Post } = require('../../../model/Post');
const pagination = require('mongoose-sex-page');
const _ = require('lodash');
module.exports = async (req,res)=>{
    let page = +req.query.page;
    let condition = {};
    if (!page || !_.isNumber(page)) page = 1;
    if(req.query.category == '-1') req.query.category = undefined;
    if(req.query.state == '-1') req.query.state = undefined;
    if(req.query.category != undefined) condition.category = req.query.category;
    if(req.query.state != undefined) condition.state = req.query.state;
    const post = await pagination(Post).page(page).size(4).display(3).find(condition).populate('author','-password').populate('category').select('-content -meta').exec();
    res.send(post)
}