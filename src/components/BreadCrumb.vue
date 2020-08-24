<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ name:'adminHome' }">{{list.breOne}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{list.breTwo}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{list.breThree}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: ['list'],
  name: 'BreadCrumb'
}
</script>

<style scoped>

</style>
