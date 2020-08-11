const { Post } = require('../../../model/Post');
module.exports = async (req,res)=>{
    const postCount = await Post.countDocuments();
    const draftCount = await Post.countDocuments({state:0});
    res.send({postCount,draftCount});
}