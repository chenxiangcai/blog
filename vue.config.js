module.exports = {
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      // entry找到默认的打包入口，调用clear则是删除默认的打包入口
      // add添加新的打包入口
      config.entry('app').clear().add('./src/main-prod.js')
      // 使用externals设置排除项
      config.set('externals', {
        vue: 'Vue',
        jquery: 'jQuery',
        vuex: 'Vuex',
        axios: 'axios',
        moment: 'moment',
        'vue-router': 'VueRouter',
        'vue-quill-editor': 'VueQuillEditor',
        'vue-lazyload': 'VueLazyload'
      })
      // 使用插件
      config.plugin('html').tap(args => {
        // 添加参数isProd
        args[0].isProd = true
        return args
      })
    })
    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      // 使用插件
      config.plugin('html').tap(args => {
        // 添加参数isProd
        args[0].isProd = false
        return args
      })
      config.entry('app').clear().add('./src/main-dev.js')
    })
  }
}
