const { Comment } = require('../../../model/Comment');
const pagination = require('mongoose-sex-page');
const _ = require('lodash');
module.exports = async (req,res)=>{
    let page = +req.query.page;
    let condition = {};
    if (!page || !_.isNumber(page)) page = 1;
    if(req.query.state == -1 ) req.query.state = undefined;
    if(req.query.state != undefined) condition.state = req.query.state;
    let comment = await pagination(Comment).find(condition).page(page).size(2).display(3).populate('author','-password').populate('post','-content -meta').exec();
    res.send(comment);
}