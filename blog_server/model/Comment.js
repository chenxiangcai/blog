const mongoose = require('mongoose')
const Joi = require('joi')
const CommentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    minlength: 1,
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: [true, '评论文章id不存在']
  },
  state: {
    type: Number,
    // 0 未批准 1 批准
    default: 0
  },
  createAt: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false })

const Comment = mongoose.model('Comment', CommentSchema)

const validateComment = comment => {
  const schema = {
    content: Joi.string().min(2).required().error(new Error('请发布大于2个字的评论')),
    state: Joi.number().valid(0, 1)
  }
  return Joi.validate(comment, schema, {
    abortEarly: false,
    allowUnknown: true
  })
}

module.exports = {
  Comment, validateComment
}
