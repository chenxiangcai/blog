const { Category,validateCategory } = require('../../../model/Category');
module.exports = async (req,res)=>{
    const { error } = validateCategory(req.fields);
    if(error) return res.status(400).send({message:error.message});
    let category = await Category.findOne({title:req.fields.title});
    if(category) return res.status(400).send({message:'此分类已存在'});
    category = new Category(req.fields);
    await category.save();
    res.send(category);
}
