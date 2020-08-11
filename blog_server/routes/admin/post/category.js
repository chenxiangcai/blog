const { Post } = require('../../../model/Post');
module.exports = async (req, res) => {
    const id = req.params.id;
    const posts = await Post.find({category: id}).populate('author', '-password').populate('category');
    res.send(posts);
}