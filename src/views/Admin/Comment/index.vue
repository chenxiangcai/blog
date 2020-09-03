<template>
<div>
  <bread-crumb :list="item" v-for="(item,i) in breadCrumbList" :key="i"></bread-crumb>
  <el-card>
    <el-row :gutter="30">
      <el-col :span="2">
        <template v-if="this.selectDelMany.length > 0 ">
          <el-button type="danger" @click="delMany">删除选中</el-button>
        </template>
      </el-col>
      <el-col :span="4">
        <el-select
          v-model="stateList.state"
          placeholder="所有状态"
          @change="filtrateState"
          clearable
          style="width: 150px"
        >
          <el-option
            v-for="item in stateList"
            :key="item.val"
            :label="item.state"
            :value="item.val"
          >
          </el-option>
        </el-select>
        <el-button icon="el-icon-search" circle style="margin-left: 17px" @click="filtrate"></el-button>
      </el-col>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="commentList"
      border
      stripe
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="author.nickName"
        label="评论人"
      >
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        width="160">
      </el-table-column>
      <el-table-column
        prop="post.title"
        label="评论在"
        width="130"
      >
      </el-table-column>
      <el-table-column
        label="评论于"
      >
        <template slot-scope="scope">{{ scope.row.createAt | dateFormat}}</template>
      </el-table-column>
      <el-table-column
        prop="author.status"
        label="状态"
        width="200"
      >
        <template v-slot="slot">
          <el-tag effect="plain" v-if="slot.row.state == 1 " type="success">已批准</el-tag>
          <el-tag effect="dark" type="warning" v-else>未审核</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="220"
      >
        <template v-slot="slot">
          <el-button type="success" icon="el-icon-check" circle @click="allowComment(slot.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteOne(slot.row)"></el-button>
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
export default {
  name: 'Comments',
  components: {
    BreadCrumb
  },
  data () {
    return {
      breadCrumbList: [{
        breOne: '首页',
        breTwo: '评论',
        breThree: '评论审核'
      }],
      commentList: [],
      stateList: [{
        state: '已批准',
        val: 1
      }, {
        state: '未审核',
        val: 0
      }],
      total: 0,
      filterParams: {
        state: '-1'
      },
      params: {
        page: 1,
        pagesize: 4
      },
      selectDelMany: ''
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    async getComments () {
      const { data: res } = await this.$http.get('/comments', { params: this.params })
      this.commentList = res.comment.records
      this.total = res.comment.total
    },
    filtrateState (state) {
      if (state === '') {
        // 如果为空 默认查询所有评论
        this.filterParams.state = -1
        this.filtrate()
        return
      }
      this.filterParams.state = state
    },
    // 筛选请求
    async filtrate () {
      const { data: res } = await this.$http.get('/comments', { params: this.filterParams })
      if (res.meta.status !== 200) this.$message.error(res.meta.msg)
      this.commentList = res.comment.records
      this.total = res.comment.total
    },
    handleSizeChange (size) {
      this.params.pagesize = size
      this.getComments()
    },
    handleCurrentChange (page) {
      this.params.page = page
      this.getComments()
    },
    // 复选框选择
    handleSelectionChange (val) {
      const delIds = []
      for (const valElement of val) {
        delIds.push(valElement._id)
      }
      // 把多个删除项处理为字符串格式 传给后端处理
      this.selectDelMany = delIds.join('-')
    },
    // 多选删除
    async delMany () {
      const confirmResult = await this.$confirm('此操作将永久删除所选评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') return this.$message.info('已取消删除操作')
      const { data: res } = await this.$http.delete(`/comments/${this.selectDelMany}`)
      if (!res.message) return this.$message.error('删除文章失败')
      this.$message.success('删除成功')
      await this.getComments()
    },
    async deleteOne (row) {
      const id = row._id
      const confirmResult = await this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') return this.$message.info('已取消删除操作')
      const { data: res } = await this.$http.delete(`/comments/${id}`)
      if (!res._id) return this.$message.error('删除文章失败')
      this.$message.success('删除文章成功')
      await this.getComments()
    },
    // 通过评论
    async allowComment (row) {
      if (row.state === 0) row.state = 1
      else row.state = 0
      const { _id } = row
      const { state } = row
      const { data: res } = await this.$http.put(`/comments/${_id}`, { state })
      if (res.nModified !== 1) return this.$message.error('评论审核失败')
      this.$message.success('更改评论状态成功')
      await this.filtrate()
    }
  }
}
</script>

<style scoped>

</style>
