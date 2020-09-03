<template>
<div>
  <!--面包屑导航-->
  <bread-crumb :list="item" v-for="(item,i) in breadCrumbList" :key="i"></bread-crumb>
  <el-card>
    <el-form :model="optForm" :rules="optRules" ref="optForm" label-width="100px" >
      <el-form-item label="网站图标">
        <el-upload
          :limit="this.limit"
          :action="upURL"
          list-type="picture-card"
          :on-success="handleAvatarSuccess"
          :on-remove="handleRemove"
          :file-list="fileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="站点名称" prop="title">
        <el-input v-model="optForm.title" style="width: 20%"></el-input>
      </el-form-item>
      <el-form-item label="评论" prop="comment">
        <el-form-item label="评论功能">
          <el-switch v-model="optForm.comment"></el-switch>
        </el-form-item>
        <el-form-item label="评论审核">
          <el-switch v-model="optForm.review"></el-switch>
        </el-form-item>
        <el-button type="primary" style="margin-top: 20px" @click="upOpt">设置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb'
import { mapState } from 'vuex'
export default {
  name: 'Options',
  computed: {
    ...mapState(['upURL', 'host'])
  },
  components: {
    BreadCrumb
  },
  data () {
    return {
      breadCrumbList: [{
        breOne: '首页',
        breTwo: '设置',
        breThree: '网站设置'
      }],
      limit: 2,
      optForm: {
        title: '',
        comment: '',
        review: '',
        logo: ''
      },
      optRules: {
        title: [
          { required: true, message: '请输入站点名称', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ]
      },
      fileList: []
    }
  },
  created () {
    this.getOption()
  },
  methods: {
    async getOption () {
      const { data: res } = await this.$http.get('/settings')
      if (!res._id) return this.$message.error('获取网站设置信息失败')
      this.optForm = res
      if (this.fileList.length === 0) { this.fileList.push({ url: `${this.host}` + res.logo }) }
    },
    handleAvatarSuccess (file) {
      this.fileList.shift()
      this.fileList.push({ url: `${this.host}` + file[0].file })
      this.optForm.logo = file[0].file
    },
    handleRemove () {
      this.optForm.logo = ''
    },
    async upOpt () {
      const { data: res } = await this.$http.post('/settings', this.optForm)
      if (!res._id) return this.$message.error('设置网站配置失败')
      this.$message.success('配置成功')
      await this.getOption()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
