<template>
  <div class="loginContainer">
    <div class="loginBox">
      <!--登录图片区域-->
      <div class="loginImg">
        <img src="@/assets/images/logo.png" alt="">
      </div>
      <!--登录表单区域-->
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" class="loginForm">
        <!--用户名-->
        <el-form-item prop="email" >
          <el-input type="email" placeholder="请输入邮箱" autofocus v-model.trim="loginForm.email" prefix-icon="iconfont icon-denglu"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input
            @keyup.enter.native="toLogin"
            placeholder="请输入密码"
            prefix-icon="iconfont icon-mima"
            v-model.trim="loginForm.password"
            show-password
          >
          </el-input>
        </el-form-item>
        <div class="register" @click="toRegister">
          <span style="font-size: 12px;color: #666">还没有账号？点我</span><a href="javascript:;" style="color: #0c8ec3"> 注册.. </a>
        </div>
        <!--按钮区域-->
        <el-form-item class="btn">
          <el-button type="primary" @click="toLogin">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 导入自定义工具
import { setStore } from '@/utils/storage'
import { mapMutations } from 'vuex'
import { login } from '@/api'

export default {
  name: 'Login',
  data () {
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
      // 登录表单
      loginForm: {
        email: '', // 设置默认账号
        password: ''
      },
      // 表单验证规则
      loginFormRules: {
        email: [
          { required: true, message: '请输入登录邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapMutations(['LOGIN']),
    // 预验证与登录
    toLogin () {
      this.$refs.loginFormRef.validate(async v => {
        if (!v) return
        // 小写转换
        const lowerCase = this.loginForm.email.toLowerCase()
        this.loginForm.email = lowerCase
        const { data: res } = await this.$http.post(login, this.loginForm)
        if (res.meta.status !== 200) return this.$message.error(res.meta.message)
        this.$message.success('登录成功')
        // token保存在sessionStorage 和vuex中
        this.LOGIN(res.userInfo)
        setStore('user', res.userInfo.nickName)
        setStore('token', res.token) // window.sessionStorage.setItem('token', res.token)
        this.$router.push(res.path)
      })
    },
    // 重置表单
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    toRegister () {
      this.$router.push({ name: 'register' })
    }
  }
}
</script>

<style lang="less" scoped>
.loginContainer {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom,#808080,#3fada8);
}

  .loginBox {
    width: 500px;
    height: 330px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    border-radius: 7px;
    box-shadow: 0 0 7px #ddd;
  }

    .loginImg {
      width: 125px;
      height: 125px;
      border-radius: 50%;
      border: 1px solid #eee;
      padding: 10px;
      background-color: #fff;
      position: absolute;
      left: 50%;
      top: 0;
      box-shadow: 0 0 5px #ddd;
      transform: translate(-50%, -50%);
    }

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }

    .loginForm {
      width: 100%;
      position: absolute;
      bottom: 10px;
      padding: 0 40px;
      box-sizing: border-box;
    }
      .btn {
        display: flex;
        justify-content: flex-end;
      }
      .register{
        float: left;
        padding-top:10px;
        font-size: 13px;
      }

</style>
