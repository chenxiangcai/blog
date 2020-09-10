<template>
<div class="registerContainer">
  <div class="registerBox">
    <h4>注册 Try 账号</h4>
    <el-form :model="registerForm" status-icon :rules="registerFormRules" ref="registerForm"  class="registerForm">
      <el-form-item  prop="nickName">
        <el-input type="text" placeholder="昵称"  v-model.trim="registerForm.nickName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item  prop="email">
        <el-input type="email" placeholder="邮箱"  v-model.trim="registerForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" placeholder="密码"  v-model.trim="registerForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" placeholder="确认密码"  v-model.trim="registerForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <div class="law">
        <el-checkbox v-model="agree"></el-checkbox>
        <span style="padding-left: 4px">
          我已阅读并同意遵守<a href="javascript:;" @click="showLaw">
          法律声明 </a>
          和 <a href="javascript:;" @click="showPrivacy">
          隐私条款 </a>
        </span>
      </div>
      <el-form-item>
        <div class="border">
          <el-button type="primary" @click="upRegister">注册</el-button>
        </div>
      </el-form-item>
      <div class="ifHave">如果您已拥有 Try 账号，则可在此 <a href="javascript:;" @click="toLogin">登录</a></div>
    </el-form>
  </div>
</div>
</template>

<script>
import { getAllUsers } from '@/api'

export default {
  name: 'register',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerForm.password !== '') {
          this.$refs.registerForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    return {
      registerForm: {
        email: '',
        nickName: '',
        password: '',
        status: 1,
        role: 'normal',
        checkPass: ''
      },
      registerFormRules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: ['blur', 'change'] }
        ],
        nickName: [
          { required: true, message: '请输入用户昵称', trigger: ['blur', 'change'] },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ]
      },
      agree: false
    }
  },
  methods: {
    upRegister () {
      this.$refs.registerForm.validate(async v => {
        if (!v) return
        if (!this.agree) return this.$message.warning('您还没有勾选相关的注册协议')
        delete this.registerForm.checkPass
        const { data: res } = await this.$http.post(getAllUsers, this.registerForm)
        if (!res._id) return this.$message.error(res.message)
        this.$message.success('恭喜您,注册成功！赶紧登录体验吧')
        this.$router.push({ name: 'login' })
      })
    },
    showLaw () {
      this.$notify({
        title: '法律声明',
        message: '此仅为个人练习开源模仿项目，仅供学习参考，承担不起任何法律问题',
        type: 'info'
      })
    },
    showPrivacy () {
      this.$notify({
        title: '隐私条款',
        message: '本网站将不会严格遵守有关法律法规和本隐私政策所载明的内容收集、使用您的信息',
        type: 'info'
      })
    },
    toLogin () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="less" scoped>
.registerContainer{
  width: 100%;
  height: 100%;
  background: linear-gradient(to left,#4ECDC4,#556270);
  .registerBox {
    width: 450px;
    height: 560px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    border-radius: 7px;
    box-shadow: 0 0 7px #ddd;
    h4{
      padding: 0;
      text-align: center;
      color: #666;
      border-bottom: 1px solid #dcdcdc;
      box-shadow: none;
      font-weight: 700;
      font-size: 20px;
      height: 60px;
      line-height: 60px;
    }
    .registerForm {
      width: 100%;
      position: absolute;
      top: 100px;
      padding: 0 40px 22px;
      height: auto;
      box-sizing: border-box;
      .border{
        margin-top: 30px;
        padding-bottom: 30px;
        border-bottom: 1px solid #ccc;
        .el-button{
          width: 100%;
          font-size: 18px;
        }
      }
      .law,.ifHave{
        color: #999;
        font-size: 13px;
        a{
          color: #5079d9;
        }
      }
      .ifHave{
        padding-top: 5px;
        text-align: center;
      }
    }
  }
}
</style>
