const { Category } = require('../../../model/Category');
module.exports = async (req,res)=>{
    const category = await Category.findOne({_id:req.params['id']});
    res.send(category);
}