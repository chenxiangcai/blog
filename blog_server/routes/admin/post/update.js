const { Post,validatePost } = require('../../../model/Post');
module.exports = async (req,res)=>{
    const id = req.params['id'];
    const { error } = validatePost(req.fields);
    if(error) return res.status(400).send({ message:error.message });
    let post = await Post.updateOne({_id:id},{$set:req.fields})
    res.send(post)
}