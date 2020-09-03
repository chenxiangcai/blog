<template>
  <div>
  <el-container>
    <!--头部导航栏-->
    <el-header>
      <el-menu
        class="w-box"
        style="margin: 0 auto"
        :default-active="activeIndex"
        mode="horizontal"
        background-color=" #4CA1AF"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
        >
        <el-menu-item>
          <img :src="host + settings.logo" alt="" style="width: 60px;height: 58px;" @click="toHome">
        </el-menu-item>
        <el-menu-item index="/home" style="margin-left: 3%" @click="toHome">首页</el-menu-item>
        <el-menu-item index="/home/allPosts" @click="toAllPosts">所有文章</el-menu-item>
          <el-submenu index="2" >
            <template v-slot:title style="float: right" >文章分类</template>
            <el-menu-item :index="'2-'+i" v-for="(item,i) in cateList" :key="item._id" @click="toCate(item._id)">{{item.title}}</el-menu-item>
          </el-submenu>
        <template>
          <el-menu-item v-show="!login" index="/login" style="float: right" @click="toLogin">登录</el-menu-item>
          <el-menu-item v-if="login" v-popover:popover  style="float: right;">欢迎您: {{userInfo.userInfo.nickName}}</el-menu-item>
        </template>
        <el-popover
          ref="popover"
          placement="bottom"
          width="150"
          trigger="hover"
          >
          <ul class="popoverList">
            <li>个人中心</li>
            <li @click="logout">退出登录</li>
          </ul>
        </el-popover>
      </el-menu>
    </el-header>
    <div class="container">
      <div :class="{aside:true,fix:showFlag,ds:displayFlag}" >
       <div style="padding-left: 60%">
         <div class="profile-info" v-if="userInfo.userInfo">
           <div>
             <template>
               <img v-if="userInfo.userInfo.avatar" class="profileImg" :src="host + userInfo.userInfo.avatar" alt="">
               <img v-else class="profileImg" :src=" host + '/assets/img/default.png'" alt="">
             </template>
           </div>
           <div class="profile-detail">
             <div>{{userInfo.userInfo.nickName}}</div>
             <div style="margin-top: 2px">{{userInfo.userInfo.email}}</div>
           </div>
         </div>
         <div class="asideSearch">
           <el-input
             placeholder="搜索博主文章"
             suffix-icon="el-icon-search"
             v-model.trim="searchPost"
             clearable
             @change="upSearchPost"
           >
           </el-input>
         </div>
         <div class="asideNewPost asideTitle" >
           <h3 style="font-size: 14px;padding: 0 16px;">最新文章</h3>
           <ul class="newPostBox">
             <li
               v-for="item in newestPost"
               :key="item._id"
               @click="toDetail(item._id)"
             >
               <a href="javascript:;">{{item.title}}</a>
             </li>
           </ul>
           <div class="asideCate asideTitle" >
             <h3 style="font-size: 14px;padding: 0 16px;">分类专栏</h3>
             <ul class="cateBox">
               <li
                 v-for="item in cateList"
                 :key="item._id"
                 @click="toCate(item._id)"
               >
                 <a href="javascript:;">{{item.title}}</a>
               </li>
             </ul>
             <div class="asideComment asideTitle" >
               <h3 style="font-size: 14px;padding: 0 16px;">最新评论</h3>
               <ul class="commentBox">
                 <li v-for="item in commentList" :key="item._id" @click="toPost(item.post)">
                   <a href="javascript:;">
                     {{item.content}}
                   </a>
                 </li>
               </ul>
             </div>
           </div>
         </div>
       </div>
      </div>
      <div class="main"  style="float: right">
        <div style="margin-right: 200px">
          <transition name="fade-transform" mode="out-in" >
            <router-view />
          </transition>
        </div>
      </div>
    </div>
    <div class="footer">
      footer
    </div>
  </el-container>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { setStore, getStore } from '@/utils/storage'
export default {
  name: 'Home',
  data () {
    return {
      activeIndex: '',
      cateList: [],
      searchPost: '',
      newestPost: [],
      commentList: [],
      showFlag: false,
      displayFlag: false
    }
  },
  computed: {
    ...mapState(['login', 'userInfo', 'host', 'settings'])
  },
  created () {
    this.getCateList()
    this.getSetting()
    this.getNewPosts()
    this.getNewComment()
    setStore('activeIndex', '/home')
    this.activeIndex = getStore('activeIndex')
    window.addEventListener('scroll', this.getScrollPosition, false)
  },
  methods: {
    ...mapMutations(['SETTINGS']),
    // 获取网站配置信息
    async getSetting () {
      const { data: res } = await this.$http.get('/settings')
      this.SETTINGS(res)
    },
    // 导航跳转
    toHome () {
      this.$router.push({ name: 'home' })
    },
    toLogin () {
      this.$router.push({ name: 'login' })
    },
    toAllPosts () {
      this.$router.push({ name: 'allPosts' })
    },
    // 登出
    logout () {
      window.sessionStorage.clear()
      this.$router.push({ name: 'login' })
    },
    async getCateList () {
      const { data: res } = await this.$http.get('/categories')
      this.cateList = res
    },
    // 导航栏文章分类请求
    toCate (id) {
      this.$router.push({
        name: 'category',
        query: { id }
      })
    },
    handleSelect (key) {
      setStore('activeIndex', key)
    },
    // 搜索文章
    async upSearchPost () {
      if (this.searchPost === '') return
      // 跳转前判断该文章是否存在
      const { data: res } = await this.$http.get(`/posts/search/${this.searchPost}`)
      if (res.length === 0) return this.$message.info('博主还没有写这篇文章喔...')
      // 存在即跳转 同时传递查询参数
      this.$router.push({ name: 'searchPost', query: { key: this.searchPost } })
      this.searchPost = ''
    },
    // 获取最新文章
    async getNewPosts () {
      const { data: res } = await this.$http.get('/posts/newest')
      console.log(res)
      this.newestPost = res
    },
    // 推荐模块跳转
    toDetail (id) {
      this.$router.push({ name: 'details', query: { id } })
    },
    // 获取最新评论
    async getNewComment () {
      const { data: res } = await this.$http.get('/comments/new')
      this.commentList = res
    },
    toPost (id) {
      this.$router.push({ name: 'details', query: { id } })
    },
    getScrollPosition: function () {
      const top = document.documentElement.scrollTop || document.body.scrollTop
      const left = document.documentElement.scrollLeft || document.body.scrollLeft
      if (top >= 600) {
        this.showFlag = true
        if (left > 0) {
          this.displayFlag = true
        } else {
          this.displayFlag = false
        }
      } else {
        this.showFlag = false
      }
    }
  }
}
</script>

<style lang="less"  scoped>

.container{
  .ds{
    display: none!important;
  }
  display: inline-block;
  width: 100%;
  height: 100%;
  background-color: #ededed;
  .aside{
    display: inline-block;
    padding: 7px;
    margin-top: 70px;
    width: 20%;
  }
  .main{
    margin-top: 70px;
    padding: 7px;
    width: 70%;
  }
  .footer{
    width: 100%;
  }
}
.w-box{
  width: 1100px;
}
.fix{
  position: fixed!important;
  left: 0px;
  top: -430px;
  z-index: 998;
}
.el-header{
  position: fixed;
  width: 100%;
  z-index: 999;
}
.aside{
  /*position: fixed;
  min-height: 1000px;
  width: 300px;
  margin-left: 13%;
  margin-top: 70px;
  padding: 7px;
  padding-top: 17px;*/
  .profile-info{
    width: 268px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
    padding: 16px 16px 6px 16px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    margin-bottom: 8px;
    .profileImg{
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
    .profile-detail{
      padding-top: 4px;
      width: 212px;
      margin-left: 15px;
      font-size: 14px;
    }
  }
  .asideSearch{
    width: 268px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
    background-color: #fff;
    padding: 7px 16px;
  }
  .asideTitle{
    width: 300px;
    color: #fff;
    background:url(../../assets/images/bg-nav.png) no-repeat center;
    background-size: 300px 38px;
    height: 38px;
    line-height: 38px;
    margin-top: 8px;
  }
  .asideNewPost{
    width: 300px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
    .newPostBox{
      background-color: #fff;
    }
  }
  .asideCate{
    width: 300px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
    /*margin-top: 236px;*/
    .cateBox{
      background-color: #fff;
    }
  }
  .asideComment{
    width: 300px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
    .commentBox{
      background-color: #fff;
    }
  }
  li{
    padding: 0 16px;
    font-size: 14px;
    cursor: pointer;
    &:hover{
      a{
        color: #4CA1AF;
      }
    }
  }
}
.el-container{
  height: 100%;
  background-color: #ededed;
  .el-header{
    padding: 0!important;
    background-color: #4CA1AF;
    .nav{
      display: flex;
      height: 100%;
      align-items: center;
    }
  }
  .el-main{
    margin-left: 277px;
    width: 1100px;
    height: 100%;
    padding: 7px;
    padding-top: 17px;
    min-height: 1000px;margin-top: 70px
  }
  .el-footer{
    background-color: #FFF;
  }
}
</style>
