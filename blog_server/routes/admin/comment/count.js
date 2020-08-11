const { Comment } = require('../../../model/Comment');
module.exports = async (req,res)=>{
    const commentCount = await Comment.countDocuments();
    const toAllowCount = await Comment.countDocuments({state:0})
    res.send({commentCount,toAllowCount});
}