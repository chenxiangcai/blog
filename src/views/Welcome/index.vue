<template>
  <div>
    <img src="@/assets/images/logo.jpg" alt="">
    <div>
      {{userInfo.email}}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Welcome',
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style scoped>

</style>
