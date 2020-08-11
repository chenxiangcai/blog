const { User,validateUser } = require('../../../model/User');
const _ =require('lodash');
module.exports = async (req,res)=>{
    req.fields = _.pick(req.fields,['avatar','status','role','nickName']);
    const {avatar,status,role,nickName} = req.fields;
    req.fields._id = req.params['id'];
    try {
        validateUser(req.fields);
    }catch (e) {
        return res.status(400).send({ message:e.message });
    }
    let findUser = await User.findOne({email:req.fields.email});
    if(findUser) return res.status(400).send({ message:'此邮箱已被注册！' });
    let user = await User.updateOne({_id:req.fields._id},{avatar,status,role,nickName});
    res.send(user)
}