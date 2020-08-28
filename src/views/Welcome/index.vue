<template>
  <div>
    <div>暂时还没有想好放什么...? 音乐播放器? emm...虽然不知道放什么 暂时先放个时间在这</div>
    <div class="time">
      {{currentTime}}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
export default {
  name: 'Welcome',
  computed: {
    ...mapState(['userInfo'])
  },
  data () {
    return {
      currentTime: moment().format('YYYY年MM月DD日 星期E kk:mm:ss')
    }
  },
  created () {
    this.getTime()
  },
  methods: {
    getTime () {
      setInterval(() => {
        this.currentTime = moment().format('YYYY年MM月DD日 星期E kk:mm:ss')
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.time{
  font-family: "等线 Light";
  font-size: 25px;
}
</style>
