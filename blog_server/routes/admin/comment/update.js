const {Comment} = require('../../../model/Comment');
module.exports = async (req,res)=>{
    const id = req.params['id'];
    const {state} = req.fields;
    let comment = await Comment.updateOne({_id:id},{state});
    res.send(comment);
}