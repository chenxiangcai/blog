<template>
  <el-container>
<!--    侧边栏-->
    <el-aside :width="isCollapse? '64px':'200px'">
      <!--头像区域-->
        <el-popover
          placement="right"
          width="150"
          trigger="hover"
          >
          <ul class="avatarPopover">
            <li @click="AboutMe">账号资料</li>
            <li @click="pwdDialogVisible = true">修改密码</li>
            <li @click="logout">退出登录</li>
          </ul>
          <div class="avatar" slot="reference">
            <el-avatar
              :class="isCollapse? 'small':'big'"
              :src="host + userInfo.avatar" >
            </el-avatar>
            <p style="text-align: center" :class="isCollapse?'none':''">{{userInfo.nickName}}</p>
          </div>
        </el-popover>
      <!--修改密码弹出框-->
      <el-dialog
        title="密码修改"
        :visible.sync="pwdDialogVisible"
        width="30%"
        @close="resetPwdForm"
        >
        <el-form :model="pwdForm" status-icon :rules="pwdRules" ref="pwdForm" label-width="70px">
          <el-form-item label="旧密码" prop="lastPwd">
            <el-input type="password" v-model="pwdForm.lastPwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd">
            <el-input type="password" v-model="pwdForm.newPwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPwd">
            <el-input type="password" v-model="pwdForm.confirmPwd" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="pwdDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="upToChangePwd">确 定</el-button>
  </span>
      </el-dialog>
      <!--功能列表区域-->
        <el-menu
          @select="handleSelect"
          :default-active= "activePath"
          background-color="#F0F2F1"
          text-color="#000"
          active-text-color="#0683B1"
          :collapse="isCollapse"
          :collapse-transition="false"
          router>
          <!--仪表盘区域-->
          <el-submenu  index="1">
            <template slot="title">
              <i class="iconfont icon-ziyuan"></i>
              <span>仪表盘</span>
            </template>
            <el-menu-item index="detail" @click="saveNavState('detail')">
              <i class="el-icon-menu"></i>
              <span>仪表盘</span>
            </el-menu-item>
          </el-submenu>
          <!--文章区域-->
          <el-submenu index="2">
            <template slot="title">
              <i class="iconfont icon-ai-article"></i>
              <span>文章</span>
            </template>
            <el-menu-item index="all-articles" @click="saveNavState('all-articles')">
              <i class="el-icon-menu"></i>
              <span>所有文章</span>
            </el-menu-item>
            <el-menu-item index="add-article" @click="saveNavState('add-article')">
              <i class="el-icon-menu"></i>
              <span>写文章</span>
            </el-menu-item>
            <el-menu-item index="article-category" @click="saveNavState('article-category')">
              <i class="el-icon-menu"></i>
              <span>文章分类</span>
            </el-menu-item>
          </el-submenu>
          <!--评论区域-->
          <el-submenu index="3" >
            <template slot="title">
              <i class="iconfont icon-tubiaozhizuo-"></i>
              <span slot="title" >评论</span>
            </template>
            <el-menu-item index="comments" @click="saveNavState('comments')">
              <i class="el-icon-menu"></i>
              <span>评论</span>
            </el-menu-item>
          </el-submenu>
          <!--用户功能区-->
          <el-submenu index="4" >
            <template slot="title">
              <i class="iconfont icon-yonghu"></i>
              <span slot="title" >用户</span>
            </template>
            <el-menu-item index="users" @click="saveNavState('users')">
              <i class="el-icon-menu"></i>
              <span>用户</span>
            </el-menu-item>
          </el-submenu>
          <!--设置区域-->
          <el-submenu index="5" >
            <template slot="title">
              <i class= "iconfont icon-shezhi1"></i>
              <span slot="title" >设置</span>
            </template>
            <el-menu-item index="options" @click="saveNavState('options')">
              <i class="el-icon-menu"></i>
              <span>网站设置</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
    </el-aside>
<!--    主体-->
    <el-container>
      <!--头部-->
      <el-header>
        <el-row :gutter="10">
          <el-col :span="1">
            <div @click="toggleIcon">
              <i class="el-icon-s-fold"></i>
            </div>
          </el-col>
          <el-col :span="17"><div class="headerTitle" @click="backToAdmin">个人博客</div></el-col>
          <el-col :span="6" >
            <el-col>
              <div v-text="currentTime" class="time"></div>
            </el-col>
          </el-col>
        </el-row>
      </el-header>
      <!--内容主体区-->
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getStore, setStore } from '@/utils/storage'
import { mapState, mapMutations } from 'vuex'
import moment from 'moment'
export default {
  name: 'AdminHome',
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
      menuList: [],
      activePath: '',
      isCollapse: false,
      pwdDialogVisible: false,
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
      },
      currentTime: moment().format('YYYY年MM月DD日 星期E kk:mm:ss')
    }
  },
  watch: {
    // 监听路由变化  解决左侧导航栏activePath不实时更新问题
    $route (to, from) {
      this.handleSelect(to.path.substring(1))
      // 路由刷新 对编辑新增表单重置为空
      if (from.path.substring(1) === 'add-article') this.clearForm()
    }
  },
  computed: {
    ...mapState(['userInfo', 'host'])
  },
  created () {
    this.activePath = getStore('activePath')
    this.getTime()
    // this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    ...mapMutations(['CLEARFORM']),
    handleSelect (index) {
      this.activePath = index
    },
    // 保存当前导航栏状态
    saveNavState (path) {
      setStore('activePath', path)
      // window.sessionStorage.setItem('activePath', path)
      this.activePath = path
    },
    // 侧边栏图标切换
    toggleIcon () {
      this.isCollapse = !this.isCollapse
    },
    // 登出
    logout () {
      window.sessionStorage.clear()
      this.$router.push({ name: 'login' })
    },
    // 点击博客返回首页
    backToAdmin () {
      this.$router.push({ name: 'adminHome' })
    },
    // 清除store数据
    clearForm () {
      this.CLEARFORM()
    },
    // hover 弹出框路由跳转
    AboutMe () {
      this.$router.push({
        name: 'users'
      })
    },
    resetPwdForm () {
      this.$refs.pwdForm.resetFields()
    },
    upToChangePwd () {
      this.$refs.pwdForm.validate(async v => {
        if (!v) return
        const { data: res } = await this.$http.put('/users/password', this.pwdForm)
        if (res.message !== '密码修改成功') return this.$message.error(res.message)
        this.$message.success(res.message)
        this.logout()
      })
    },
    getTime () {
      setInterval(() => {
        this.currentTime = moment().format('YYYY年MM月DD日 星期E kk:mm:ss')
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>
.el-container{
  height: 100%;
  .el-aside{
    height: 100%;
    background-color: #F0F2F1;
  }
  .el-header{
    height: 50px!important;
    background-color: #4CA1AF;
    display: flex;
    align-items: center;
    padding-left: 10px!important;
    .headerTitle{
      font-size: 25px;
      color: #fff;
      cursor: pointer;
      display: flex;
      align-items: center;
      height: 50px;
    }
  }
  .big{
    width: 90px;
    height: 90px;
    display: block;
    margin: 20px auto;
  }
  .small{
    display: block;
    margin: 10px auto;
  }
  .el-menu{
    width: 100%;
    padding-top: 7px;
  }
  .iconfont{
    padding-right: 10px;
  }
  .el-icon-s-fold{
    font-size:37px;
    height: 50px;
    line-height: 50px;
  }
  .el-row{
    width: 100%;
  }
  .el-menu {
    border-right: 0;
  }
}
.none{
  display: none;
}
a{
  text-decoration: none;
  color: black;
}
.avatarPopover li{
  text-align: center;
  list-style: none;
  height: 40px;
  line-height: 40px;
  border-radius: 6px;
  cursor: pointer;
}
.avatarPopover li:hover{
  background-color: #ddd;
}
.el-popover{
  text-align: center!important;
}
.time{
  font-family: "等线 Light";
  font-size: 25px;
  height: 50px;
  display: flex;
  align-items: center;
  float: right;
}
</style>
