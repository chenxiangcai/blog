const { User,validateUser } = require('../../../model/User');
const bcrypt = require('bcrypt');
const _ = require('lodash');
module.exports = async (req,res)=>{
    try {
        validateUser(req.fields);
    }catch (e) {
        return res.status(400).send({ message:e.message });
    }
    let user = await User.findOne({email:req.fields.email});
    if(user) return res.status(400).send({message:'此邮箱已被注册！'});
    const salt = await bcrypt.genSalt(10);
    req.fields.password = await bcrypt.hash(req.fields.password, salt);
    // const hashPassword = await bcrypt.hash(req.fields.password,salt);
    user = new User(req.fields);
    await user.save();
    res.send(_.pick(user,['_id','nickName','email','role','status','avatar','createTime']));
}