const { Category } = require('../../../model/Category');
module.exports =async (req,res)=>{
    const categoryCount = await Category.countDocuments();
    res.send({categoryCount});
}