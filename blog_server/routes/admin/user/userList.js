const { User } = require('../../../model/User')
module.exports = async (req,res)=>{
    const user = await User.find().select('-password').sort('-createTime');
    res.send(user)
}