<template>
  <div>
    <Shelf :title="'文章总览'">
      <div slot="content" class="hot">
        <post-item v-for="i in postList" :key="i._id" :posts="i"></post-item>
      </div>
    </Shelf>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.query.page"
      :page-sizes="[6, 12, 20, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <copyrights></copyrights>
  </div>
</template>

<script>
import postItem from '@/components/postItem'
import Shelf from '@/components/Shelf'
import { getAllPosts } from '@/api'
import Copyrights from '../../../common/Copyrights'
export default {
  name: 'allPosts',
  components: {
    postItem,
    Shelf,
    Copyrights
  },
  data () {
    return {
      postList: [],
      query: {
        page: 1,
        pagesize: 6
      },
      total: 0
    }
  },
  created () {
    this.getAllPosts()
  },
  methods: {
    async getAllPosts () {
      const { data: res } = await this.$http.get(getAllPosts, { params: this.query })
      this.total = res.data.total
      this.postList = res.data.records
    },
    handleSizeChange (size) {
      this.query.pagesize = size
      this.getAllPosts()
    },
    handleCurrentChange (page) {
      this.query.page = page
      this.getAllPosts()
    }
  }
}
</script>

<style lang="less" scoped>
.good-item{
  width: 33.33%;
}
</style>
