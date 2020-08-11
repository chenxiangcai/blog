const { Post } = require('../../../model/Post');
module.exports = async (req,res)=>{
    const id = req.params.id;
    const post = await Post.findOne({_id: id}).populate(' author category');
    // 增加文章阅读数量
    post.meta.views = post.meta.views + 1;
    await post.save();
    return res.send(post);
}