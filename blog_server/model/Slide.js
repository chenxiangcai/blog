const mongoose = require('mongoose');
const Joi = require('joi');
const schema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:1,
        maxlength:20
    },
    image:{
        type:String,
        default:null,
        required:true
    },
    link:{
        type:String,
        default:null
    }
},{versionKey:false})

const validateSlide = slide =>{
    const Schema = {
        image:Joi.string().required().error(new Error('请选择轮播图上传')),
        title:Joi.string().required().min(1).max(20).error(new Error('请输入1-20位的标题'))
    }
    return Joi.validate(slide,Schema,{
        allowUnknown: true
    })
}

const Slide = mongoose.model('Slide',schema);
module.exports = {
    Slide,validateSlide
}