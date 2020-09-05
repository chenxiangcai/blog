<template>
<div>
  <BreadCrumb :list="item" v-for="(item,i) in breadCrumbList" :key="i"></BreadCrumb>
  <el-card>
    <el-form :model="addOrEditForm" :rules="addOrEditFormRules" ref="addOrEditForm" label-width="100px" label-position="top">
      <el-row :gutter="30">
        <el-col :span="17">
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="addOrEditForm.title"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <quill-editor v-model="addOrEditForm.content"></quill-editor>
          </el-form-item>
        </el-col>
        <el-col :span="7" >
          <el-form-item label="文章封面">
            <template>
              <img
                v-if="this.showImg"
                :src="this.imageUrl + this.editForm.cover"
                alt="这张照片被外星人拐走了..."
                class="img"
              >
            </template>
            <el-upload
              :limit="this.limit"
              :action="upURL"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-success="handleAvatarSuccess"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="this.imageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="12" >
              <el-form-item label="文章分类" prop="category">
                <el-select
                  v-model="editFormCate"
                  @change="selectCate"
                  clearable
                >
                  <el-option
                    v-for="item in cateList"
                    :key="item._id"
                    :label="item.title"
                    :value="item._id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" >
              <el-form-item label="发布状态" prop="state">
                <el-select
                  v-model="editFormState"
                  @change="selectState"
                  clearable
                >
                  <el-option
                    v-for="item in stateList"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="发布时间" prop="createAt">
                <el-date-picker
                  v-model="addOrEditForm.createAt"
                  type="datetime"
                  placeholder="选择日期时间"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="更新时间" prop="updateAt">
                <el-date-picker
                  v-model="addOrEditForm.updateAt"
                  type="datetime"
                  placeholder="选择日期时间"
                  disabled
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <template>
            <el-button type="primary" @click="editArticle"  v-if="this.editForm !==''">修改</el-button>
            <el-button type="primary" @click="addArticle" v-else>提交</el-button>
          </template>
          </el-col>
      </el-row>
    </el-form>
  </el-card>
</div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb'
import { setStore } from '@/utils/storage'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'NewArticle',
  computed: {
    ...mapState(['userInfo', 'editForm', 'upURL'])
  },
  data () {
    return {
      showImg: false,
      breadCrumbList: [{
        breOne: '首页',
        breTwo: '文章',
        breThree: '写文章'
      }],
      addOrEditForm: {
        author: '',
        title: '',
        state: '',
        content: '',
        category: '',
        cover: '',
        createAt: ''
      },
      imageUrl: 'http://localhost',
      addOrEditFormRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        createAt: [
          { required: true, message: '请选择发布时间', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择文章分类', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请选择文章状态', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      cateList: [],
      // 设置当前日期之前不可选
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      stateList: [{
        id: 0,
        title: '草稿'
      }, {
        id: 1,
        title: '已发布'
      }],
      limit: 1,
      editFormCate: '',
      editFormState: ''
    }
  },
  mounted () {
    this.getCateList()
    // 判断是新增页面还是编辑页面
    if (Object.keys(this.editForm).length !== 0) {
      this.addOrEditForm = this.editForm
      this.showImg = true
      // 设置下拉框回填值
      this.editFormCate = this.editForm.category._id
      this.editFormState = this.editForm.state
    }
  },
  components: {
    BreadCrumb
  },
  methods: {
    ...mapMutations(['CLEARFORM']),
    resetForm () {
      this.$refs.addOrEditForm.resetFields()
    },
    handleAvatarSuccess (file) {
      // 设置图片要拼接的地址
      /* this.imageUrl = 'http://localhost' */
      this.imageUrl = this.imageUrl + file[0].file
      this.addOrEditForm.cover = file[0].file
      this.showImg = false
    },
    handleRemove () {
      this.addOrEditForm.cover = ''
    },
    handlePictureCardPreview () {
      this.dialogImageUrl = this.imageUrl
      this.dialogVisible = true
    },
    async getCateList () {
      const { data: res } = await this.$http.get('/categories')
      this.cateList = res
    },
    selectCate (id) {
      if (id === '') return
      this.addOrEditForm.category = id
    },
    selectState (id) {
      if (id === '') return
      this.addOrEditForm.state = id
    },
    addArticle () {
      this.$refs.addOrEditForm.validate(async v => {
        if (!v) return
        this.addOrEditForm.author = this.userInfo._id
        const { data: res } = await this.$http.post('/posts', this.addOrEditForm)
        if (!res.meta) return this.$message.error(res.message)
        this.$message.success('新增文章成功')
        // 设置当前页面index位置
        setStore('activePath', 'all-articles')
        this.$router.push({ name: 'allArticles' })
      })
    },
    async editArticle () {
      const id = this.addOrEditForm._id
      const { data: res } = await this.$http.put(`/posts/${id}`, this.addOrEditForm)
      if (!res.ok) return this.$message.error(res.message)
      this.$message.success('更新文章信息成功')
      // 更新成功后清除store中editForm数据 解决图片路劲显示异常
      this.CLEARFORM()
      setStore('activePath', 'all-articles')
      this.$router.push({ name: 'allArticles' })
    }
  }
}
</script>

<style lang="less" scoped>
.img{
  width: 300px;
  height: 200px;
}
.el-table {
  margin-top: 18px!important;
}
</style>
