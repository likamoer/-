import Vue from 'vue/dist/vue.js'
import Http from 'vue-resource'
import App from 'APPS/index'
// import Store from '../vuex/index'
import config from '../commons/config'
// import * as transitions from '../commons/transition' // 注册自定义过渡类
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// 原型链安装
Vue.prototype.CommonsConfig = config

Vue.use(Http)
Vue.use(Element)

let run = function () {
  return new Vue({
    el: '#main-component-warp',
    replace: false,
    components: {
      App
    }
    // store: Store
  })
}

run()
