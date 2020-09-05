<template>
  <el-container>
    <el-header>
      <el-menu
        style="margin: 0 auto;width: 1400px"
        :default-active="activePath"
        mode="horizontal"
        background-color="#4CA1AF"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
      >
        <el-menu-item style="margin-left: 3%" @click="toHome">
          <i class="el-icon-back" style="color: #fff"></i>
        </el-menu-item>
        <el-menu-item index="/personal" style="margin-left: 3%" @click="toPersonal">个人信息</el-menu-item>
        <el-menu-item index="/pwd" @click="toEditPwd">修改密码</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <transition name="fade-transform" mode="out-in" >
        <router-view />
      </transition>
    </el-main>
    <copyrights></copyrights>
  </el-container>
</template>

<script>
import Copyrights from '@/common/Copyrights'
import { setStore, getStore } from '@/utils/storage'
import { mapState } from 'vuex'
export default {
  name: 'user',
  components: {
    Copyrights
  },
  data () {
    return {
      activePath: ''
    }
  },
  computed: {
    ...mapState(['settings', 'host'])
  },
  created () {
    setStore('activePath', '/personal')
    this.activePath = getStore('activePath')
  },
  methods: {
    handleSelect (key) {
      setStore('activePath', key)
    },
    toHome () {
      this.$router.push({ name: 'home' })
    },
    toPersonal () {
      this.$router.push({ name: 'center' })
    },
    toEditPwd () {
      this.$router.push({ name: 'editpwd' })
    }
  }
}
</script>

<style lang="less" scoped>
.el-header{
  position: fixed;
  width: 100%;
  z-index: 999;
  background-color: #4CA1AF;
}
</style>
