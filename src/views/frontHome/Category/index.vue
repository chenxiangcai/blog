<template>
  <div>
    <Shelf :title="`${title}`">
      <div slot="content" class="hot">
        <post-item v-for="i in postList" :key="i._id" :posts="i"></post-item>
      </div>
    </Shelf>
    <copyrights></copyrights>
  </div>
</template>

<script>
import postItem from '@/components/postItem'
import Shelf from '@/components/Shelf'
import { postCategory } from '@/api'
import Copyrights from '../../../common/Copyrights'
export default {
  name: 'category',
  components: {
    postItem,
    Shelf,
    Copyrights
  },
  data () {
    return {
      postList: [],
      title: ''
    }
  },
  watch: {
    // 监听路由 发生变化时发送对应的请求
    $route (to, from) {
      this.getCatePosts()
    }
  },
  created () {
    this.getCatePosts()
  },
  methods: {
    async getCatePosts () {
      const { data: res } = await this.$http.get(postCategory + `/${this.$route.query.id}`)
      this.postList = res
      this.title = res[0].category.title
    }
  }
}
</script>

<style scoped>

</style>
