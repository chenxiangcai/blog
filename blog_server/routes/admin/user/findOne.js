const { User } = require('../../../model/User');
module.exports = async (req,res)=>{
    const user = await User.findOne({_id:req.params.id}).select('-password')
    res.send(user)
}