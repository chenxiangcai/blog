<template>
  <div class="footer">
    <div style="width: 1220px;">
      <div class="siteInfo">
        <ul class="c0">
          <h3 class="c1">服务支持</h3>
          <ul>
            <li class="c2"><a href="https://github.com/chenxiangcai/blog" class="c3">官方开源</a></li>
            <li class="c2"><a href="https://github.com/chenxiangcai/blog/tree/master/src/views/frontHome" class="c3">项目前端</a></li>
            <li class="c2"><a href="https://github.com/chenxiangcai/blog/tree/master/blog_server" class="c3">项目后端</a></li>
          </ul>
        </ul>
        <ul class="c0">
          <h3 class="c1">自助服务</h3>
          <ul>
            <li class="c2"><a href="https://github.com/chenxiangcai" class="c3">个人博客</a></li>
            <li class="c2"><a href="" class="c3">个人简介</a></li>
            <li class="c2"><a href="" class="c3">学习代码</a></li>
          </ul>
        </ul>
        <ul class="c0">
          <h3 class="c1">友情链接</h3>
          <ul>
            <li class="c2"><a href="https://cn.vuejs.org/" class="c3">Vue</a></li>
            <li class="c2"><a href="https://react.docschina.org/" class="c3">React</a></li>
            <li class="c2"><a href="https://angular.cn/" class="c3">Angular</a></li>
          </ul>
        </ul>
        <ul class="c0">
          <h3 class="c1">服务支持</h3>
          <ul>
            <li class="c2"><a href="" class="c3">官方开源</a></li>
            <li class="c2"><a href="" class="c3">项目前端</a></li>
            <li class="c2"><a href="" class="c3">项目后端</a></li>
          </ul>
        </ul>
        <ul class="c0">
          <h3 class="c1">服务支持</h3>
          <ul>
            <li class="c2"><a href="" class="c3">官方开源</a></li>
            <li class="c2"><a href="" class="c3">项目前端</a></li>
            <li class="c2"><a href="" class="c3">项目后端</a></li>
          </ul>
        </ul>
        <ul class="c0">
          <h3 class="c1">关注我吧</h3>
          <ul>
            <li class="c2"><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1690154855&site=qq&menu=yes" class="c3">腾讯QQ</a></li>
            <li class="c2"><a href="https://music.163.com/#/user/home?id=499517748" class="c3">网易云</a></li>
            <li class="c2"><a href="" class="c3">个人微博</a></li>
          </ul>
        </ul>
        <ul class="c4">
          <li class="tel">
            <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1690154855&site=qq&menu=yes" class="c5">1690154855</a>
          </li>
          <li class="online">
            <el-button class="help"  plain @click="help">在线帮助</el-button>
          </li>
        </ul>
      </div>
    </div>
    <div class="copyright">
      <h4 style="color: #757575">Copyright ©2020,  trylive</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Copyrights',
  methods: {
    help () {
      this.$notify({
        title: '离线帮助',
        message: '自渡',
        type: 'warning'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.footer {
  padding: 50px 0 20px;
  border-top: 1px solid #e6e6e6;
  background: #fafafa;
  margin-top: 60px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.siteInfo{
  height: 100px;
  padding: 50px 0 70px;
  border-bottom: 1px solid #e6e6e6;
  position: relative;
}
.c0 {
  width: 149px;
  line-height: 1;
  float: left;
}
.c1{
  color: #646464;
  font-size: 12px;
  padding: 0 0 14px;
}
.c2 {
  color: #c3c3c3;
  font-size: 12px;
  padding: 6px 0;
}
.c3 {
  color: #969696;
}
.c4{
  position: absolute;
  right: 0;
  overflow: hidden;
  line-height: 34px;
}
.c5 {
  color: #646464;
  right: -67px;
  position: relative;
}
.tel{
  font-size: 30px;
  line-height: 1;
  color: #646464;
  top: -2px;
  position: relative;
}
.online{
  clear: both;
  width: 241px;
  font-size: 12px;
  line-height: 18px;
  color: #c3c3c3;
  text-align: right;
}
.help{
  margin-top: 25px;
}
.copyright{
  color: #434d55;
  font-size: 12px;
  padding: 40px 0 0;
  display: flex;
}
</style>
