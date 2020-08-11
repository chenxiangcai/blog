const {Comment} = require('../../../model/Comment');
module.exports = async (req,res)=>{
    const id = req.params['id'];
    if(id.indexOf('-') != -1){
        const ids = id.split('-');
        for (const idElement of ids) {
            await Comment.findOneAndDelete({_id:idElement})
        }
        res.send({message:'批量删除成功'});
    }else {
        let comment = await Comment.findOneAndDelete({_id:id});
        res.send(comment);
    }
}