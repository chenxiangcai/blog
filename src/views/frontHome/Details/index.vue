<template>
   <div style="padding: 7px">
     <!--面包屑导航-->
     <el-breadcrumb separator-class="el-icon-arrow-right" >
       <el-breadcrumb-item :to="{ path: `${breSrc}` }" v-if="!breSrc.includes('2')">{{breTitle}}</el-breadcrumb-item>
       <el-breadcrumb-item>{{detailList.category.title}}</el-breadcrumb-item>
       <el-breadcrumb-item>文章</el-breadcrumb-item>
       <el-breadcrumb-item>文章详情</el-breadcrumb-item>
     </el-breadcrumb>
     <!--文章内容-->
     <div class="gray-box">
       <h1 class="title">{{detailList.title}}</h1>
       <div class="article-info">
         <div class="info-top">
           <el-popover
             ref="popover"
             placement="bottom"
             width="210"
             trigger="hover"
             >
             <span>最后发布：{{detailList.updateAt | dateFormat}}</span>
             <span style="display: block">首次发布：{{detailList.createAt | dateFormat}}</span>
           </el-popover>
           {{detailList.author.nickName}}
           <span style="margin-left: 20px;" v-popover:popover>{{detailList.updateAt | dateFormat}}</span>
           <img class="articleReadEyes" src="@/assets/images/articleReadEyes.png" alt="">
           <span>{{detailList.meta.views}}</span>
           <div class="like" @click="upLike">
             <img class="likeIcon" src="@/assets/images/like.png" alt="">
             <span style="margin-left: 4px">{{detailList.meta.likes}}</span>
           </div>
         </div>
         <div style="margin-top: 7px">
            <span>分类专栏：{{detailList.category.title}}</span>
         </div>
       </div>
       <div class="content" v-html="detailList.content"></div>
     </div>
     <!--评论区-->
     <div class="commentBox" v-if="settings.comment">
       <form id="commentForm">
         <textarea
           ref="commentForm"
           @click="showMoreHeight"
           maxlength="1000"
           :class="{'comment-content':true,'comment-content open': showFlag}"
           placeholder="在这里发表点想说的话吧"
           v-model.trim="newComment"
         >
         </textarea>
         <div :class="{'sendBox':true,'ds':!showFlag}">
           <el-button type="danger" size="mini" @click="upNewComment">发表评论</el-button>
         </div>
       </form>
       <el-button
         size="mini"
         style="margin-left: 10px;" type="info"
         :class="{'ds':showFlag}"
         @click="showMoreHeight"
       >评论</el-button>
     </div>
     <div class="comment-list-box">
       <ul>
         <li
           v-for="item in commentList"
           :key="item._id">
           <span class="name">{{item.author.nickName}}:</span>
           <span class="new-comment">{{item.content}}</span>
           <span class="date" :title="item.createAt | dateFormat">{{ formattingTime(item.createAt) }}</span>
         </li>
       </ul>
     </div>
   </div>
</template>
<script>
import { getStore } from '@/utils/storage'
import { mapState } from 'vuex'
import { getAllPosts, getAllComments, postLike } from '@/api'

export default {
  name: 'detailPost',
  data () {
    return {
      detailList: [],
      breSrc: '',
      showFlag: false,
      commentList: [],
      newComment: '',
      state: 0
    }
  },
  created () {
    this.getPostDetails()
    this.breSrc = getStore('activeIndex')
    this.formattingTime()
  },
  computed: {
    ...mapState(['settings']),
    // 面包屑路径计算
    breTitle: () => {
      if (getStore('activeIndex') === '/home/allPosts') return '所有文章'
      else return '首页'
    }
  },
  watch: {
    $route (to, from) {
      this.getPostDetails()
    }
  },
  methods: {
    async getPostDetails () {
      const { data: res } = await this.$http.get(getAllPosts + `/${this.$route.query.id}`)
      this.detailList = res.post
      this.commentList = res.comment
    },
    showMoreHeight () {
      this.showFlag = true
    },
    showLessHeight () {
      this.showFlag = false
    },
    formattingTime (time) {
      return this.$moment(time).fromNow()
    },
    // 提交评论
    async upNewComment () {
      if (this.newComment.length === 0) return this.$message.error('请输入评论内容')
      if (!this.settings.review) this.state = 1
      const { data: res } = await this.$http.post(getAllComments, {
        content: this.newComment,
        post: this.detailList._id,
        state: this.state
      })
      if (!res._id) return this.$message.error(res.message)
      this.$message.success('评论成功,审核后显示')
      this.newComment = ''
      this.showLessHeight()
      await this.getPostDetails()
    },
    // 点赞
    async upLike () {
      const { data: res } = await this.$http.post(postLike + `/${this.detailList._id}`)
      if (!res.meta) return this.$message.error('点赞失败')
      this.$message.success('感谢支持,点赞成功')
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb{
  margin-bottom: -170px;
}
.gray-box {
  background: #fff;
  border-color: rgba(0,0,0,.14);
  box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
  padding: 30px;
  margin: 20px 0 5px 0;
  .title{
    font-size: 28px;
    word-wrap: break-word;
    color: #222226;
    font-weight: 600;
    margin: 0;
    word-break: break-all;
  }
  .article-info{
    color: #999aaa;
    margin-top: 13px;
    background: #f7f7fc;
    border-radius: 4px;
    padding: 10px;
    font-size: 14px;
    .info-top{
      display: flex;
      align-items: center;
      .articleReadEyes{
        width: 24px;
        height: 24px;
        margin-left: 20px;
      };
      .likeIcon{
        width: 16px;
        height: 16px;
        margin-left: 12px;
      }
      .like{
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    }
  }
  .content{
    font-size: 18px;
    line-height: 26px;
    padding-top: 20px;
  }
}
.ds{
  display: none;
}
.comment-list-box{
  background-color: #fff;
  padding: 0 24px;
  li{
    margin-top: 10px;
    border-bottom: 1px solid #e8e8ee;
    padding-bottom: 5px;
    font-size: 15px;
    font-family: sans-serif;
    word-break: break-all;
  }
  li:first-child{
    margin-top: 0;
    padding-top: 10px;
  }
  li:last-child{
    border:none;
  }
  .date{
    font-size: 13px;
    color: #999aaa;
    vertical-align: center;
    margin-left: 10px;
  }
  .name {
    margin-left: 0;
    margin-right: 0;
    font-size: 14px;
    font-weight: 400;
    color: #555666;
    vertical-align: top;
  }
  .new-comment {
    color: #222226;
    word-break: break-all;
    margin-left: 7px;
  }
}
.commentBox{
  background-color: #fff;
  box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
  padding: 16px 24px 8px;
  display: flex!important;
  textarea{
    overflow: auto;
    outline: none;
  }
  #commentForm{
    width: 100%;
  }
  .comment-content{
    font-family: sans-serif;
    display: block;
    width: 100%;
    padding: 6px 8px;
    background: rgba(248,249,251,0.8);
    border: 1px solid #dadde0;
    border-radius: 4px;
    resize: none;
    height: 36px;
    font-size: 14px;
    line-height: 22px;
    box-sizing: border-box;
    transition: height .3s ease-in-out;
  }
  .comment-content.open {
    height: 64px;
    background-color: #fff;
    box-shadow: 0 0 6px 0 #5094d5;
    border: 1px solid #5094d5;
  }
  .sendBox{
    float: right;
    margin-top: 10px;
  }
}
</style>
