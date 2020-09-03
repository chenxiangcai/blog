<template>
  <el-row class="good-item">
    <el-col>
      <el-card :body-style="{padding: 0}">
        <div class="good-img">
          <a @click="toPostDetails(posts._id)">
            <img v-lazy=" host + posts.cover" v-if="posts.cover">
            <img v-else src="@/assets/images/error.png" alt="">
          </a>
        </div>
        <h6 class="good-title">{{posts.title}}</h6>
        <h3 class="sub-title ellipsis">{{posts.author.nickName}} 更新于 {{posts.createAt | dateFormat}}</h3>
        <div class="good-price pr">
          <div class="ds pa">
            <a href='javascript:;'>
              <el-button @click="toPostDetails(posts._id)">查看详情</el-button>
            </a>
          </div>
          <p>
            <span style="font-size:14px"> 评论({{posts.meta.comments}})  点赞({{posts.meta.likes}})  浏览({{posts.meta.views}}) </span>
          </p>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'postItem',
  props: ['posts'],
  computed: {
    ...mapState(['host'])
  },
  methods: {
    async toPostDetails (id) {
      this.$router.push({ name: 'details', query: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.good-img {
  display: flex;
  justify-content: center;
  a {
    display: block;
    img {
      margin: 50px auto 10px;
      width: 310px;
      height: 206px;
      display: block;
      border-radius: 6px;
      cursor: pointer;
    }
  }
}
.good-price {
  margin: 5px 0;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: #d44d44;
  font-family: Arial;
  font-size: 18px;
  font-weight: 700;
  display: flex;
  justify-content: space-around;
  padding-bottom: 60px;
a {
  margin-right: 5px;
}
.ds {
  display: none;
}
}
.good-price:hover .ds {
  display: block;
}
.good-title {
  line-height: 1.2;
  font-size: 20px;
  color: #424242;
  margin: 0 auto;
  padding: 5px  14px;
  text-align: center;
  overflow: hidden;
}
h3 {
  text-align: center;
  line-height: 1.2;
  font-size: 12px;
  color: #AAA;
  padding: 10px;
}
.good-item {
  background: #fff;
  width: 50%;
  transition: all 0.5s;
  height: 410px;
  overflow: hidden;
&:hover {
   transform: translateY(-3px);
   box-shadow: 1px 1px 20px #999;
   z-index: 998;
.good-price p {
  display: none;
}
.ds {
  display: flex;
}
}
}
.el-card {
  border: none;
 }
</style>
