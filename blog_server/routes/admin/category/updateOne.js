const { Category,validateCategory } = require('../../../model/Category');
module.exports = async (req,res)=>{
    req.fields._id = req.params['id'];
    const { error } = validateCategory(req.fields);
    if(error) return res.status(400).send({message:error.message});
    const { title,className } = req.fields;
    let category = await Category.updateOne({_id:req.fields._id},{title,className});
    res.send(category);
}