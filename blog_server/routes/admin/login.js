const { User,validateLogin } = require('../../model/User');
const bcrypt = require('bcrypt');
const _ = require('lodash');
module.exports = async (req,res)=>{
    const { error } = validateLogin(req.fields);
    if(error) return res.status(400).send({ message: error.message });
    const user = await User.findOne({ email:req.fields.email });
    if (!user) return res.status(400).send({ message: '邮箱或密码错误！' });
    if(! await bcrypt.compare(req.fields.password,user.password )) return res.status(400).send({message:'邮箱或密码错误！'});
    req.session.userInfo = user;
    res.send(_.pick(user, ['nickName','email','role','avatar','_id','status','createTime']));
}