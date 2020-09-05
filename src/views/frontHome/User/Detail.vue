<template>
  <el-card>
    <el-form :model="personalForm" :rules="personalFormRules" ref="personalForm" >
      <el-form-item label="头像">
        <el-row>
          <el-col :span="12">
            <el-upload
            :limit="this.limit"
            :action="upURL"
            list-type="picture-card"
            :on-success="handleAvatarSuccess"
            :on-remove="handleRemove"
            :file-list="fileList"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          </el-col>
          <el-col :span="10">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="personalForm.email"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickName" style="margin-top: 7px">
              <el-input v-model="personalForm.nickName"></el-input>
            </el-form-item>
            <el-button class="editP" type="primary" @click="upUserInfo">修改</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'UserDetail',
  computed: {
    ...mapState(['upURL', 'userInfo', 'host'])
  },
  data () {
    /* 自定义验证规则 */
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
      limit: 1,
      fileList: [],
      personalForm: {
        avatar: '',
        email: '',
        nickName: '',
        role: '',
        status: ''
      },
      personalFormRules: {
        nickName: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.personalForm.email = this.userInfo.userInfo.email
    this.personalForm.nickName = this.userInfo.userInfo.nickName
    this.fileList.push({ url: `${this.host}` + this.userInfo.userInfo.avatar })
  },
  methods: {
    ...mapMutations(['USERINFO']),
    // 头像上传处理
    handleAvatarSuccess (file) {
      this.fileList.shift()
      this.fileList.push({ url: `${this.host}` + file[0].file })
      this.personalForm.avatar = file[0].file
    },
    handleRemove () {
      this.personalForm.avatar = ''
    },
    async upUserInfo () {
      /* 通过vuex保存的用户信息，填充要更新用户表单中的属性 */
      if (!this.personalForm.avatar) this.personalForm.avatar = this.userInfo.userInfo.avatar
      this.personalForm.role = this.userInfo.userInfo.role
      this.personalForm.status = this.userInfo.userInfo.status
      const { data: res } = await this.$http.put(`/users/${this.userInfo.userInfo._id}`, this.personalForm)
      if (res.nModified !== 1) return this.$message.error('修改用户信息失败')
      this.$message.success('更新用户信息成功')
      /* 更新成功后更新vuex中用户信息 */
      this.USERINFO(this.personalForm)
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
    margin-top: 47px;
    float: right;
  }
}
</style>
