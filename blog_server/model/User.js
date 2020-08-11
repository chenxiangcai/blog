const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');
//用户集合规则
const userSchema = new mongoose.Schema({
    nickName:{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
    },
    avatar:{
        type: String,
        default: null
    },
    role:{
        type: String,
        default: 'normal',
        enum: ['admin','normal']
    },
    createTime:{
        type: Date,
        default: Date.now
    },
    status:{ //默认1 激活 ,0未激活
        type: Number,
        required: true,
        default: 1,
    }
},{versionKey:false}) //忽略增加的文档在数据库中的__v字段
const User = mongoose.model('User',userSchema);

//初始化用户
User.findOne({email:'cxc@qq.com'}).then( async result =>{
    if(result == null){
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash('777',salt);
        await User.create({
            nickName: 'cxc',
            email: 'cxc@qq.com',
            password: hashPassword,
            role: 'admin',
            status: 1
        })
    }
})

//用户注册验证
const validateUser = user =>{
    const Schema = {
        nickName: Joi.string().required().min(2).max(20).error(new Error('请输入2-20位的用户名！')),
        email:Joi.string().required().regex(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/).error(new Error('邮箱格式验证错误')),
        password:Joi.string().required().regex(/^[0-9a-zA-Z]{3,20}$/).error(new Error('请输入3-20位的密码！')),
        status:Joi.number().valid(0,1),
        role:Joi.string().valid('admin','normal')
    }
    return Joi.validate(user,Schema,{
        abortEarly: false,   //把所有错误检测完再返回
        allowUnknown:true   //允许对象包含被忽略的未知键
    })
}

//用户登录验证
const validateLogin = user =>{
    const Schema = {
        email: Joi.string().regex(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/).required().error(new Error('邮箱或密码错误')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{2,30}$/).error(new Error('邮箱或密码错误'))
    }
    return Joi.validate(user,Schema,{
        abortEarly: true    //出现错误立即返回
    })
}

module.exports = {
    User,validateUser,validateLogin
}