const { Category } = require('../../../model/Category')
module.exports = async (req,res)=>{
    const category = await Category.find();
    res.send(category);
}