<template>
  <div>
    <Shelf :title="'热门文章'">
      <div slot="content" class="hot">
        <post-item v-for="i in hotList" :key="i._id" :posts="i"></post-item>
      </div>
    </Shelf>
    <!--遍历找到对应的文章分类-->
    <div v-for="(item,i) in moduleList" :key="i">
      <section>
        <Shelf :title="item">
          <div slot="content" class="hot">
            <post-item v-for="i in postList.filter(j=>j.category.title ===item)" :key="i._id" :posts="i"></post-item>
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
  name: 'index',
  data () {
    return {
      postList: [],
      moduleList: [],
      hotList: []
    }
  },
  components: {
    postItem,
    Shelf
  },
  created () {
    this.getCateList()
    this.getAllPosts()
    this.getHotPosts()
  },
  methods: {
    async getCateList () {
      const { data: res } = await this.$http.get('/categories')
      this.cateList = res
      this.cateList.filter((item) => {
        this.moduleList.push(item.title)
      })
    },
    async getAllPosts () {
      const { data: res } = await this.$http.get('/posts')
      this.postList = res.data.records
    },
    async getHotPosts () {
      const { data: res } = await this.$http.get('/posts/recommend')
      this.hotList = res
    }
  }
}
</script>

<style  scoped>

</style>
