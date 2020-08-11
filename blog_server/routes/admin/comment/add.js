const { Comment, validateComment } = require('../../../model/Comment');
const { Post } = require('../../../model/Post');
module.exports = async (req, res) => {
    if (req.session.userInfo) {
        req.fields.author = req.session.userInfo._id;
        const { error } = validateComment(req.fields);
        if (error) return res.status(400).send({message: error.message})
        const comment = new Comment(req.fields);
        await comment.save();
        let post = await Post.findOne({_id: req.fields.post});
        // 修改评论数量
        post.meta.comments = post.meta.comments + 1;
        await post.save();
        res.send(comment);
    }else {
        res.status(400).send({message: '请登录'})
    }
}