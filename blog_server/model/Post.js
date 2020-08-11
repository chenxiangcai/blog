const mongoose = require('mongoose');
const Joi = require('joi');
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        minlength:2,
        maxlength:50,
        required:[true,'请输入文章标题']
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    state:{
        type:Number,
        default:0  //0 草稿  1 发布
    },
    createAt:{
        type:Date,
        default:Date.now
    },
    updateAt:{
        type:Date,
        default:Date.now
    },
    content:{
        type:String,
        default:null
    },
    cover:{
        type:String,
        default:null
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:[true,'所选分类不存在']
    },
    meta: {
        // 看过数量
        views: { type: Number, default: 0 },
        // 喜欢数量
        likes: { type: Number, default: 0 },
        // 评论数量
        comments: { type: Number, default: 0 }
    }
},{versionKey:false})

//更新时间 中间件拦截
postSchema.pre('updateOne',function (next) {
    this.updateOne({}, { updateAt: Date.now() })
    next();
})

const validatePost = post =>{
    const Schema = {
        title:Joi.string().required().min(2).max(50).error(new Error('请输入2-50位的标题')),
        state:Joi.number().required().valid(0,1).error(new Error('文章状态非法')),
/*      content:Joi.string(),
        cover:Joi.any().empty(),
        category: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().error(new Error('分类id格式非法'))*/
    };
    return Joi.validate(post,Schema,{
        allowUnknown:true,
        abortEarly: false
    })
}
const Post = mongoose.model('Post',postSchema);
module.exports = {
    Post,validatePost
}