<template>
<div>
  <!--面包屑导航-->
  <BreadCrumb v-for="(item,i) in breadCrumbList" :key="i" :list="item"></BreadCrumb>
  <!--主体卡片区域-->
  <el-card>
    <!--搜索-->
    <el-row :gutter="40">
      <el-col :span="2">
        <template v-if="this.selectDelArt.length > 0 ">
          <el-button type="danger" @click="delMany">删除选中</el-button>
        </template>
      </el-col>
      <el-col :span="5">
        <el-input
          placeholder="请输入查找标题"
          v-model="params.query"
          clearable
          @change="getArticleList"
         >
          <el-button slot="append" icon="el-icon-search" @click="getArticleList"></el-button>
        </el-input>
      </el-col>
      <el-col :span="10">
        <el-select
          v-model="cateList.title"
          placeholder="所有分类"
          @change="filtrateCate"
          clearable
          style="width: 150px"
        >
          <el-option
            v-for="item in cateList"
            :key="item._id"
            :label="item.title"
            :value="item._id"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="stateList.state"
          placeholder="所有状态"
          @change="filtrateState"
          clearable
          style="width: 150px"
          class="margin-left7"
        >
          <el-option
            v-for="item in stateList"
            :key="item.val"
            :label="item.state"
            :value="item.val"
          >
          </el-option>
        </el-select>
        <el-button type="primary" @click="filtrate" class="margin-left7">筛选</el-button>
      </el-col>
      <el-col :span="7">
          <el-button type="primary" @click="toAdd">写文章</el-button>
      </el-col>
    </el-row>
    <!--文章列表-->
    <el-table
      ref="multipleTable"
      :data="articleList"
      border
      stripe
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @cell-dblclick="editArticle"
      v-loading="loading"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
       >
      </el-table-column>
      <el-table-column
        prop="author.nickName"
        label="作者"
        width="160">
      </el-table-column>
      <el-table-column
        prop="category.title"
        label="分类"
        width="130"
        >
      </el-table-column>
      <el-table-column
        label="发表时间"
      >
        <template slot-scope="scope">{{ scope.row.createAt | dateFormat}}</template>
      </el-table-column>
      <el-table-column
        prop="author.status"
        label="状态"
        width="200"
      >
        <template v-slot="slot">
          <el-tag effect="plain" v-if="slot.row.state == 1 " type="success">已发布</el-tag>
          <el-tag effect="plain" type="info" v-else>草稿</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="220"
      >
        <template v-slot="slot">
          <el-button type="primary" icon="el-icon-edit" circle @click="editArticle(slot.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteArticle(slot.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.page"
      :page-sizes="[4, 10, 20, 40]"
      :page-size="params.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb'
import { mapMutations } from 'vuex'
import { setStore } from '@/utils/storage'
export default {
  name: 'AllArticles',
  components: {
    BreadCrumb
  },
  data () {
    return {
      articleList: [],
      cateList: [],
      stateList: [{
        state: '已发布',
        val: 1
      }, {
        state: '草稿',
        val: 0
      }],
      breadCrumbList: [{
        breOne: '首页',
        breTwo: '文章',
        breThree: '文章列表'
      }],
      total: 0,
      params: {
        query: '',
        page: 1,
        pagesize: 10
      },
      filterParams: {
        category: -1,
        state: -1
      },
      selectDelArt: '',
      loading: true
    }
  },
  created () {
    this.getArticleList()
    this.getCateList()
  },
  methods: {
    ...mapMutations(['EDITFORM']),
    async getArticleList () {
      const { data: res } = await this.$http.get('/posts', { params: this.params })
      if (res.meta.status !== 200) this.$message.error(res.meta.msg)
      this.articleList = res.data.records
      this.total = res.data.total
      this.loading = false
    },
    async getCateList () {
      const { data: res } = await this.$http.get('/categories')
      this.cateList = res
    },
    // 复选框选择
    handleSelectionChange (val) {
      const delIds = []
      for (const valElement of val) {
        delIds.push(valElement._id)
      }
      // 把多个删除项处理为字符串格式 传给后端处理
      this.selectDelArt = delIds.join('-')
    },
    // 多选删除
    async delMany () {
      const confirmResult = await this.$confirm('此操作将永久删除所选文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') return this.$message.info('已取消删除操作')
      const { data: res } = await this.$http.delete(`/posts/${this.selectDelArt}`)
      if (!res) return this.$message.error('删除文章失败')
      this.$message.success('删除成功')
      await this.getArticleList()
    },
    // 分页
    handleSizeChange (size) {
      this.params.pagesize = size
      this.getArticleList()
    },
    handleCurrentChange (page) {
      this.params.page = page
      this.getArticleList()
    },
    // 筛选数据存储
    filtrateCate (id) {
      // 如果为空 表示未选择 恢复默认值
      if (id === '') {
        this.filterParams.category = -1
        this.filtrate()
        return
      }
      this.filterParams.category = id
    },
    filtrateState (state) {
      if (state === '') {
        this.filterParams.state = -1
        this.filtrate()
        return
      }
      this.filterParams.state = state
    },
    // 筛选请求
    async filtrate () {
      const { data: res } = await this.$http.get('/posts', { params: this.filterParams })
      if (res.meta.status !== 200) this.$message.error(res.meta.msg)
      this.articleList = res.data.records
      this.total = res.data.total
    },
    // 编辑文章
    async editArticle (row) {
      const id = row._id
      const { data: res } = await this.$http.get(`/posts/${id}`)
      if (!res.post) return this.$message.error('数据获取失败')
      this.EDITFORM(res.post)
      setStore('activePath', 'add-article')
      this.$router.push({ name: 'addArticle', query: { id } })
    },
    // 删除文章
    async deleteArticle (row) {
      const id = row._id
      const confirmResult = await this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') return this.$message.info('已取消删除操作')
      const { data: res } = await this.$http.delete(`/posts/${id}`)
      if (!res) return this.$message.error('删除文章失败')
      this.$message.success('删除文章成功')
      await this.getArticleList()
    },
    // 跳转到新增页面
    toAdd () {
      setStore('activePath', 'add-article')
      this.$router.push({ name: 'addArticle' })
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 18px!important;
}
</style>
