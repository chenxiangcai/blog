<template>
<div>
  <!--面包屑导航-->
  <bread-crumb :list="item" v-for="(item,i) in breadCrumbList" :key="i"></bread-crumb>
  <!--主体卡片区域-->
  <el-card>
    <template v-if="this.selectDelMany.length > 0 ">
      <el-button type="danger" @click="delMany" style="margin-right: 30px">删除选中</el-button>
    </template>
    <el-button type="primary" @click="addDialogVisible = true">添加分类</el-button>
    <!--表格-->
    <el-table
          :data="cateList"
          stripe
          style="width: 100%"
          @selection-change="handleSelectionChange"
         >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="title"
            label="分类名称"
           >
          </el-table-column>
          <el-table-column
            prop="className"
            label="分类标志"
          >
          </el-table-column>
          <el-table-column
            label="创建时间"
          >
            <template slot-scope="scope">{{ scope.row.createAt | dateFormat}}</template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="180"
           >
            <template v-slot="slot">
              <el-button type="primary"  icon="el-icon-edit" circle @click="editCate(slot.row)"></el-button>
              <el-button type="danger"  icon="el-icon-delete" circle @click="deleteCate(slot.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
    <!--添加对话框-->
    <el-dialog
      title="添加分类"
      :visible.sync="addDialogVisible"
      width="40%"
      @close="resetForm"
    >
      <el-form
        :model="cateForm"
        :rules="cateFormRules"
        ref="cateForm"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="title" >
          <el-input v-model="cateForm.title" style="width: 97%" ></el-input>
        </el-form-item>
        <el-form-item label="分类图标" prop="className">
          <el-input v-model="cateForm.className" style="width: 97%" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="upCateForm">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改对话框-->
    <el-dialog
      title="修改分类"
      :visible.sync="editDialogVisible"
      width="40%"
      @close="resetForm"
    >
      <el-form
        :model="editCateForm"
        :rules="cateFormRules"
        ref="cateForm"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="title">
          <el-input v-model="editCateForm.title" style="width: 97%" ></el-input>
        </el-form-item>
        <el-form-item label="分类图标" prop="className">
          <el-input v-model="editCateForm.className" style="width: 97%"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyCateForm">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</div>
</template>

<script>
import { getAllCategory } from '@/api'
import BreadCrumb from '@/components/BreadCrumb'
export default {
  name: 'article-category',
  components: {
    BreadCrumb
  },
  data () {
    return {
      breadCrumbList: [{
        breOne: '首页',
        breTwo: '文章',
        breThree: '文章分类'
      }],
      cateForm: {
        title: '',
        className: ''
      },
      editCateForm: {
        title: '',
        className: ''
      },
      cateFormRules: {
        title: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        className: [
          { required: true, message: '请输入分类图标类名', trigger: 'blur' }
        ]
      },
      cateList: [],
      addDialogVisible: false,
      editDialogVisible: false,
      selectDelMany: ''
    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    async getCateList () {
      const { data: res } = await this.$http.get(getAllCategory)
      this.cateList = res
    },
    resetForm () {
      this.$refs.cateForm.resetFields()
    },
    upCateForm () {
      this.$refs.cateForm.validate(async v => {
        if (!v) return
        const { data: res } = await this.$http.post(getAllCategory, this.cateForm)
        if (!res._id) return this.$message.error(res.message)
        this.addDialogVisible = false
        this.$message.success('添加分类成功')
        await this.getCateList()
      })
    },
    // 点击修改
    async editCate (row) {
      const { _id } = row
      const { data: res } = await this.$http.get(getAllCategory + `/${_id}`)
      this.editDialogVisible = true
      this.editCateForm = res
    },
    // 修改提交
    async modifyCateForm () {
      const { _id } = this.editCateForm
      const { data: res } = await this.$http.put(getAllCategory + `/${_id}`, this.editCateForm)
      if (!res.ok) return this.$message.error(res.message)
      this.editDialogVisible = false
      this.$message.success('更新分类成功')
      await this.getCateList()
    },
    // 单选删除
    async deleteCate (row) {
      const confirmResult = await this.$confirm('此操作将永久删除该分类 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') return this.$message.info('已取消删除操作')
      const { _id } = row
      const { data: res } = await this.$http.delete(getAllCategory + `/${_id}`)
      if (res.message !== '删除成功') return this.$message.error(res.message)
      this.$message.success('删除分类成功')
      await this.getCateList()
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
      const confirmResult = await this.$confirm('此操作将永久删除所选分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') return this.$message.info('已取消删除操作')
      const { data: res } = await this.$http.delete(getAllCategory + `/${this.selectDelMany}`)
      if (!res) return this.$message.error('删除分类失败')
      this.$message.success('删除成功')
      await this.getCateList()
    }
  }
}
</script>

<style scoped>

</style>
