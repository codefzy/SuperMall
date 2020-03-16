// 配置一下别名，如果这个文件叫vue.config的js的话，到时候会自动合并配置的
module.exports={
  configureWebpack:{
    resolve:{
      extensions:[],
      alias:{
          'assets':'@/assets',
          'common':'@/common',
          'components':'@/components',
          'network':'@/network',
          'views':'@/views'
      }
    }
  },
  // 这么特么是配置  跨域访问的！！！
  // devServer:{
  //   open:true,//配置自启动浏览器
  //   host:'localhost',
  //   // host:'192.168.43.246',// ip地址
  //   port:8081,// 设置端口号
  //   https: false,
  //   hotOnly: false,
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:8089', //API服务器的地址
  //       ws: true,  //代理websockets
  //       changeOrigin: true, // 虚拟的站点需要更管origin
  //       pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
  //         '^/api': ''
  //       }
  //     }
  //   }
  // }

  // 这里是配置
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-px-to-viewport")({
            unitToConvert: "px",   // 需要转换的单位，默认为"px"
            viewportWidth: 375,    // 视窗宽度，对应的是我们设计稿的宽度
            viewportHeight:667,    // 视窗高度，对应的是我们设计稿的高度
            unitPrecision: 3,      // 指定px 转化为视窗单位值的小数位数，例如 3.87862  取值为 3.878
            propList: ["*"],       // 能转化为vw的属性列表,就是css height、width、border 之类的属性
            viewportUnit: "vw",    // 希望使用的视口单位
            fontViewportUnit: "vw",// 字体使用的视口单位
            selectorBlackList: [], // 需要忽略的CSS选择器，就是class="XXX"
            minPixelValue: 1,      // 最小的转换数值,就是如果只有1px或者小于1px 就不用转化为vm了
            mediaQuery: false,     // 媒体查询里的单位是否需要转换单位
            replace: true,         // 转换后是否添加备用单位
            exclude: [/node_modules/],// 忽略文件目录
          })
        ]
      }
    }
  }
}
