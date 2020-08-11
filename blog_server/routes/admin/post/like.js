const { Post } = require('../../../model/Post');
module.exports = async (req, res) => {
    const id = req.params.id;
    const post = await Post.findOne({_id: id}).select('meta');
    post.meta.likes = post.meta.likes + 1;
    await post.save();
    res.send(post);
}