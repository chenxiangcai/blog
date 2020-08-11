const mongoose = require('mongoose');
const { Schema } = mongoose;
const Joi = require('joi');
const SettingSchema = new Schema({
    // 网站图标
    logo: {
        type: String,
        default: null
    },
    // 站点名称
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    // 是否开启评论功能
    comment: {
        type: Boolean,
        required: true,
        default: false
    },
    // 评论必须经过人工审核
    review: {
        type: Boolean,
        required: true,
        default: false
    }
}, {versionKey: false});

const Setting = mongoose.model('Setting', SettingSchema);

// 注册数据格式校验
const validateSettings = settings => {
    // 定义对象验证规则
    const schema = {
        logo:Joi.string().required().error(new Error('请选择网站图片上传')),
        title: Joi.string().min(2).max(30).required().error(new Error('请输入2-30位的网站标题'))
    };
    // 验证
    return Joi.validate(settings, schema, {
        // 检测到所有错误
        abortEarly: false,
        // 允许对象包含被忽略的未知键
        allowUnknown: true
    });
}

// 导出对象
module.exports = {
    Setting,
    validateSettings
};