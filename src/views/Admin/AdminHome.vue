<template>
  <el-container>
<!--    侧边栏-->
    <el-aside :width="isCollapse? '64px':'200px'">
      <!--头像区域-->
      <div @click="backToAdmin">
        <el-avatar
          :class="isCollapse? 'small':'big'"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
        </el-avatar>
      </div>
      <!--功能列表区域-->
        <el-menu
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
            <el-menu-item index="new-article" @click="saveNavState('new-article')">
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
              <span>设置</span>
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
            <span @click="toggleIcon">
              <i class="el-icon-s-fold"></i>
            </span>
          </el-col>
          <el-col :span="22"><span class="headerTitle">个人博客</span></el-col>
          <el-col :span="1" >
            <el-button type="info" @click="logout">退出</el-button>
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
import { removeStore, getStore, setStore } from '@/utils/storage'
export default {
  name: 'AdminHome',
  data () {
    return {
      menuList: [],
      activePath: '',
      isCollapse: false
    }
  },
  created () {
    this.getCatList()
    this.activePath = getStore('activePath')
    // this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    // 获取数据
    async getCatList () {

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
      removeStore('token')
      removeStore('activePath')
      // window.sessionStorage.clear()
      this.$router.push({ name: 'login' })
    },
    // 点击头像返回首页
    backToAdmin () {
      this.$router.push({ name: 'adminHome' })
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
    background-color: skyblue;
    display: flex;
    align-items: center;
    padding-left: 10px!important;
    .headerTitle{
      font-size: 25px;
      color: #fff
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
  }
  .el-row{
    width: 100%;
  }
  .el-menu {
    border-right: 0;
  }
}

</style>
