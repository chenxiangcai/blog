<template>
    <el-card style="margin-bottom: 245px">
      <el-form :model="pwdForm" status-icon :rules="pwdRules" ref="pwdForm" label-width="77px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="旧密码" prop="lastPwd">
              <el-input type="password" v-model="pwdForm.lastPwd" autocomplete="off" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="新密码" prop="newPwd">
              <el-input type="password" v-model="pwdForm.newPwd" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="确认密码" prop="confirmPwd">
              <el-input type="password" v-model="pwdForm.confirmPwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-button class="editP" type="primary" @click="upToChangePwd">修改</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
</template>

<script>
import { updatePwd } from '@/api'

export default {
  name: 'EditPwd',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.pwdForm.confirmPwd !== '') {
          this.$refs.pwdForm.validateField('confirmPwd')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.pwdForm.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      pwdForm: {
        newPwd: '',
        confirmPwd: '',
        lastPwd: ''
      },
      pwdRules: {
        lastPwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        newPwd: [
          { validator: validatePass, trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        confirmPwd: [
          { validator: validatePass2, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    upToChangePwd () {
      this.$refs.pwdForm.validate(async v => {
        if (!v) return
        const { data: res } = await this.$http.put(updatePwd, this.pwdForm)
        if (res.message !== '密码修改成功') return this.$message.error(res.message)
        this.$message.success(res.message)
        this.logout()
      })
    },
    logout () {
      window.sessionStorage.clear()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="less" scoped>
.el-card{
  width: 70%;
  margin: 70px auto 0;
  padding-top: 45px;
  padding-bottom: 20px;
  .editP{
    margin-top: 17px;
    float: right;
  }
}
.footer{
  margin-top: 7px;
}
</style>
