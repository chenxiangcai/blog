<template>
<div>
  <div class="main">
    <div class="words">{{words}} by {{from}}</div>
  </div>
  <div class="list">
    <ul>
      <li class="title">站点内容统计</li>
      <li><strong>{{postNum}}</strong> 篇文章 ( <strong>{{draftNum}}</strong> 篇草稿)</li>
      <li><strong>{{catNum}}</strong> 个分类</li>
      <li><strong>{{commentNum}}</strong> 条评论( <strong>{{toAllowNum}}</strong> 条待审核)</li>
    </ul>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Detail',
  computed: {
    ...mapState(['host'])
  },
  created () {
    this.getSlides()
    this.getWords()
  },
  data () {
    return {
      catNum: 0,
      postNum: 0,
      draftNum: 0,
      commentNum: 0,
      toAllowNum: 0,
      words: '革命尚未成功，同志仍需努力。',
      from: '孙中山'
    }
  },
  methods: {
    async getSlides () {
      const { data: catNum } = await this.$http.get('/categories/count')
      this.catNum = catNum.categoryCount
      const { data: postNum } = await this.$http.get('/posts/count')
      this.postNum = postNum.postCount
      this.draftNum = postNum.draftCount
      const { data: commentNum } = await this.$http.get('/comments/count')
      this.commentNum = commentNum.commentCount
      this.toAllowNum = commentNum.toAllowCount
    },
    getWords () {
      setInterval(async () => {
        const { data: res } = await this.$http.get('https://v1.hitokoto.cn')
        this.words = res.hitokoto
        this.from = res.from
      }, 5000)
    }
  }
}
</script>

<style lang="less" scoped>
.main{
  height: 300px;
  width: 100%;
  background-color: #eef;
  border-radius: 6px;
}
.list{
  width: 500px;
  height: 163px;
  ul{
    margin-left: -40px;
    }
  .title{
    font-size: 16px;
    font-weight: 500;
    background-color: #eef;
  }
  ul>li{
    position: relative;
    display: block;
    padding: 10px 15px;
    margin-bottom: -1px;
    background-color: #ffffff;
    border: 1px solid #dddddd;
    font-size: 14px;
  }
}
.words{
  font-size: 40px;
  font-weight: 500;
  font-family: 华文行楷;
  display: flex;
  justify-content: center;
  align-items:center;
  height: 100%;
}
</style>
