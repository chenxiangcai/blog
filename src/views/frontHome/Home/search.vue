<template>
<div>
  <div v-for="item in postList" :key="item._id">
    <section>
      <Shelf :title="item.title">
        <div slot="content" class="hot">
          <post-item v-for="i in postList" :key="i._id" :posts="i"></post-item>
        </div>
      </Shelf>
    </section>
  </div>
</div>
</template>

<script>
import Shelf from '@/components/Shelf'
import postItem from '@/components/postItem'
export default {
  name: 'search',
  components: {
    Shelf, postItem
  },
  data () {
    return {
      postList: []
    }
  },
  created () {
    this.getPosts()
  },
  watch: {
    // 监听路由变化 每次变化都重新请求数据渲染页面
    $route (to, from) {
      this.getPosts()
    }
  },
  methods: {
    async getPosts () {
      const { data: res } = await this.$http.get(`/posts/search/${this.$route.query.key}`)
      console.log(res)
      this.postList = res
    }
  }
}
</script>

<style scoped>

</style>
