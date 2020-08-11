const { Category } = require('../../../model/Category');
module.exports = async (req,res)=>{
    const id = req.params['id'];
    if(id.indexOf('-') != -1){
        const ids = id.split('-');
        for (const id of ids) {
            await Category.findOneAndDelete({_id:id});
        }
        res.send({message:'删除成功'});
    }else {
       await Category.findOneAndDelete({_id:id});
       res.send({message:'删除成功'});
    }
}