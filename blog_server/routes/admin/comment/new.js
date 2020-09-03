const { Comment } = require('../../../model/Comment');
module.exports = async (req, res) => {
    const posts = await Comment.find({state:1}).populate('author', '-password').sort('-createAt').limit(6);
    res.send(posts);
}
