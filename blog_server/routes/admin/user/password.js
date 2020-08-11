const { User } = require('../../../model/User');
const bcrypt = require('bcrypt');
const Joi = require('joi');
module.exports = async (req,res)=>{
    if(req.session.userInfo){
        const userPwd = req.session.userInfo.password;
        const { lastPwd,newPwd,confirmPwd } = req.fields;
        const Schema = {
            newPwd:Joi.string().required().regex(/^[0-9a-zA-Z]{3,20}$/).error(new Error('请输入3-20位的密码！'))
        }
        if(await bcrypt.compare(newPwd,userPwd)) return res.status(400).send({message:'新旧密码一致，无需更改'});//输入的新旧密码比对
        if(await bcrypt.compare(lastPwd,userPwd)){  //输入密码与正确密码比对
            if(newPwd == confirmPwd){  //新密码比对
                const { error } = Joi.validate(req.fields, Schema,{allowUnknown:true});
                if (error) return res.status(400).send({message: error.message});
                const salt = await bcrypt.genSalt(10);
                const password = await bcrypt.hash(newPwd,salt);
                await User.updateOne({_id:req.session.userInfo._id},{password:password});
                res.send('密码修改成功');
            }else {
                return res.status(400).send({message:'两次输入密码不一致，请重新输入'});
            }
        }else {
            return res.status(400).send({message:'初始密码错误，请输入正确的密码'});
        }
    }else {
        return res.status(400).send({message:'请先登录'})
    }
}