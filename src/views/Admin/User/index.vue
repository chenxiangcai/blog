<template>
<div>
  <!--面包屑-->
  <bread-crumb :list="item" v-for="(item,i) in breadCrumbList" :key="i"></bread-crumb>
  <!--主体内容区域-->
  <el-card>
    <!--搜索-->
    <el-row :gutter="40">
      <el-col :span="2">
        <!--删除选中-->
        <template v-if="this.selectDelMany.length > 0 ">
          <el-button type="danger" @click="delMany">删除选中</el-button>
        </template>
      </el-col>
      <el-col :span="5">
        <el-input
          placeholder="请输入邮箱或昵称"
          v-model="params.query"
          clearable
          @change="getUserList"
        >
          <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
        </el-input>
      </el-col>
      <el-col :span="10">
        <el-select
          v-model="statusList.state"
          placeholder="所有状态"
          @change="filtrateState"
          clearable
          style="width: 150px"
        >
          <el-option
            v-for="item in statusList"
            :key="item.val"
            :label="item.state"
            :value="item.val"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="roleList.role"
          placeholder="所有角色"
          @change="filtrateRole"
          clearable
          style="width: 150px"
          class="margin-left7"
        >
          <el-option
            v-for="item in roleList"
            :key="item.val"
            :label="item.role"
            :value="item.val"
          >
          </el-option>
        </el-select>
        <el-button type="primary" @click="filtrate" class="margin-left7">筛选</el-button>
      </el-col>
      <!--添加用户-->
      <el-button type="primary" @click="addDialogVisible = true" style="float: left">添加用户</el-button>
    </el-row>
    <!--用户列表-->
    <el-table
      ref="multipleTable"
      :data="userList"
      border
      stripe
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="title"
        label="头像"
        width="77"
      >
        <template v-slot="slot">
          <img :src="host + slot.row.avatar" alt="" v-if="slot.row.avatar">
          <img :src="host + '/assets/img/default.png'" alt="" v-else>
        </template>
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
      >
      </el-table-column>
      <el-table-column
        prop="nickName"
        label="昵称"
      >
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="200"
      >
        <template v-slot="slot">
          <el-tag v-if="slot.row.status ==0 " effect="dark" type="warning">未激活</el-tag>
          <el-tag v-else effect="dark" type="success" >已激活</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="role"
        label="角色"
        width="200"
      >
        <template v-slot="slot">
          <el-tag effect="dark" v-if="slot.row.role === 'admin' " type="primary">管理员</el-tag>
          <el-tag effect="plain" type="info" v-else>普通用户</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="注册时间"
      >
        <template slot-scope="scope">{{ scope.row.createTime | dateFormat}}</template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="220"
      >
        <template v-slot="slot">
          <el-button type="primary" icon="el-icon-edit" circle @click="editUser(slot.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteUser(slot.row)"></el-button>
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
    <!--添加用户弹框-->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      @close="resetForm"
      width="35%"
      >
      <el-form :model="addForm" :rules="addFormRules" ref="addForm" label-width="51px">
        <el-form-item label="头像">
          <template v-if="addForm.avatar == ''">
            <img :src="host + '/assets/img/default.png'" alt="" class="addImg">
          </template>
          <el-upload
            :limit="this.limit"
            :action="upURL"
            list-type="picture-card"
            :on-success="handleAvatarSuccess"
            :on-remove="handleRemove"
            :file-list="this.addFilesList">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="addForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" >
          <el-input v-model="addForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <template>
            <el-radio border size="medium" v-model="addForm.status" label="0">未激活</el-radio>
            <el-radio border size="medium" v-model="addForm.status" label="1">激活</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="角色">
          <template>
            <el-radio border size="medium" v-model="addForm.role" label="normal">普通用户</el-radio>
            <el-radio border size="medium" v-model="addForm.role" label="admin">超级管理员</el-radio>
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="upAddUser">确 定</el-button>
      </span>
    </el-dialog>

    <!--编辑用户-->
    <el-dialog
      title="用户编辑"
      :visible.sync="editDialogVisible"
      width="35%"
      @close="resetEditForm"
    >
      <el-form :model="editForm" :rules="addFormRules" ref="editForm" label-width="51px">
        <el-form-item label="头像">
          <template>
            <img
              v-show="this.defaultImg"
              :src=" host + '/assets/img/default.png'"
              class="addImg"
            >
            <img v-show="this.userImg" :src="host + editForm.avatar" class="addImg">
          </template>
          <el-upload
            :limit="this.limit"
            :action="upURL"
            list-type="picture-card"
            :on-success="handleAvatarSuccessEdit"
            :on-remove="handleRemoveEdit"
            :file-list="this.editFilesList"
           >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="editForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <template>
            <el-radio border size="medium" v-model="editForm.status" label="0">未激活</el-radio>
            <el-radio border size="medium" v-model="editForm.status" label="1">激活</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="角色">
          <template>
            <el-radio border size="medium" v-model="editForm.role" label="normal">普通用户</el-radio>
            <el-radio border size="medium" v-model="editForm.role" label="admin">超级管理员</el-radio>
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="upEditUser">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb'
import { mapState } from 'vuex'
export default {
  name: 'Users',
  computed: {
    ...mapState(['host', 'upURL'])
  },
  components: {
    BreadCrumb
  },
  data () {
    /* 自定义验证规则 */
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    return {
      addFilesList: [],
      editFilesList: [],
      defaultImg: true,
      userImg: false,
      breadCrumbList: [{
        breOne: '首页',
        breTwo: '用户',
        breThree: '用户管理'
      }],
      userList: [],
      params: {
        query: '',
        page: 1,
        pagesize: 4
      },
      total: 0,
      loading: true,
      selectDelMany: '',
      addDialogVisible: false,
      editDialogVisible: false,
      addForm: {
        nickName: '',
        email: '',
        password: '',
        role: 'normal',
        avatar: '',
        status: '0'
      },
      editForm: {},
      addFormRules: {
        nickName: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 2, message: '长度在 2 个字符以上', trigger: 'blur' }
        ]
      },
      limit: 1,
      statusList: [{
        state: '已激活',
        val: 1
      }, {
        state: '未激活',
        val: 0
      }],
      roleList: [{
        role: '管理员',
        val: 'admin'
      }, {
        role: '普通用户',
        val: 'normal'
      }],
      filterParams: {
        role: -1,
        status: -1
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 复选框选择
    handleSelectionChange (val) {
      const delIds = []
      for (const valElement of val) {
        delIds.push(valElement._id)
      }
      // 把多个删除项处理为字符串格式 传给后端处理
      this.selectDelMany = delIds.join('-')
    },
    handleSizeChange (size) {
      this.params.pagesize = size
      this.getUserList()
    },
    handleCurrentChange (page) {
      this.params.page = page
      this.getUserList()
    },
    async getUserList () {
      const { data: res } = await this.$http.get('/users', { params: this.params })
      if (res.meta.status !== 200) return this.$message.error('获取用户列表失败')
      this.userList = res.user.records
      this.total = res.user.total
      this.loading = false
    },
    // 多选删除
    async delMany () {
      const confirmResult = await this.$confirm('此操作将永久删除所选用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') return this.$message.info('已取消删除操作')
      const { data: res } = await this.$http.delete(`/users/${this.selectDelMany}`)
      if (!res.message) return this.$message.error('删除用户失败')
      this.$message.success('删除成功')
      await this.getUserList()
    },
    // 单选删除
    async deleteUser (row) {
      const id = row._id
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') return this.$message.info('已取消删除操作')
      const { data: res } = await this.$http.delete(`/users/${id}`)
      console.log(res)
      if (!res) return this.$message.error('删除用户失败')
      this.$message.success('删除用户成功')
      await this.getUserList()
    },
    // 添加用户
    upAddUser () {
      this.$refs.addForm.validate(async v => {
        if (!v) return
        const { data: res } = await this.$http.post('/users', this.addForm)
        if (!res._id) return this.$message.error(res.message)
        this.addDialogVisible = false
        this.$message.success('添加用户成功')
        await this.getUserList()
      })
    },
    // 头像上传
    handleAvatarSuccess (file) {
      this.addForm.avatar = file[0].file
    },
    handleAvatarSuccessEdit (file) {
      this.editForm.avatar = file[0].file
      this.defaultImg = false
      this.userImg = false
    },
    handleRemove () {
      this.addForm.avatar = ''
    },
    handleRemoveEdit () {
      this.editForm.avatar = ''
      this.defaultImg = true
    },
    resetForm () {
      this.$refs.addForm.resetFields()
      this.addForm.avatar = ''
      this.addFilesList = []
    },
    resetEditForm () {
      this.editForm.avatar = ''
      this.editFilesList = []
    },
    // 编辑用户
    async editUser (row) {
      /* this.editForm.avatar = row.avatar */
      const { _id } = row
      const { data: res } = await this.$http.get(`/users/${_id}`)
      this.editForm = res
      this.editForm.status = res.status.toString()
      // 判断当前用户是否有头像
      if (this.editForm.avatar !== '') {
        this.defaultImg = false
        this.userImg = true
      } else {
        this.defaultImg = true
        this.userImg = false
      }
      this.editDialogVisible = true
    },
    async upEditUser () {
      const { data: res } = await this.$http.put(`/users/${this.editForm._id}`, this.editForm)
      if (res.nModified !== 1) return this.$message.error('用户信息编辑失败')
      this.editDialogVisible = false
      this.$message.success('用户信息更新成功')
      await this.getUserList()
    },
    // 筛选数据存储
    filtrateState (status) {
      // 如果为空 表示未选择 恢复默认值
      if (status === '') {
        this.filterParams.status = -1
        this.filtrate()
        return
      }
      this.filterParams.status = status
    },
    filtrateRole (role) {
      if (role === '') {
        this.filterParams.role = -1
        this.filtrate()
        return
      }
      this.filterParams.role = role
    },
    // 筛选请求
    async filtrate () {
      const { data: res } = await this.$http.get('/users', { params: this.filterParams })
      if (res.meta.status !== 200) this.$message.error(res.meta.msg)
      this.userList = res.user.records
      this.total = res.user.total
    }
  }

}
</script>

<style lang="less" scoped>
img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.addImg{
  width: 150px;
  height: 148px;
  border-radius: 0;
  float: left;
  margin-right: 10px;
}
.el-radio.is-bordered+.el-radio.is-bordered {
  margin-left: -10px;
}
</style>
