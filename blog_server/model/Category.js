const mongoose = require('mongoose');
const Joi = require('joi');
const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: true,
        unique: true
    },
    className: {
        type: String,
        default: null
    },
    createAt: {
        type: Date,
        default: Date.now
    }
}, {versionKey: false});

const Category = mongoose.model('Category', CategorySchema);

// 文章分类格式校验（路由级别）
const validateCategory = category => {
    const schema = {
        title: Joi.string().min(2).max(30).required().error(new Error('分类名称不符合验证验证规则')),
        createAt: Joi.date().default(Date.now, 'created time'),
        className: Joi.string().required().error(new Error('请填写分类图标类名')),
    };
    return Joi.validate(category, schema, {
        // 检测到所有错误
        abortEarly: false,
        // 允许对象包含被忽略的未知键
        allowUnknown: true
    });
}

module.exports = {
    Category,
    validateCategory
}