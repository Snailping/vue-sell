// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' //router就相当于router文件夹下index.js里面new Router({})的那个对象


import './assets/styles/index.styl'

Vue.config.productionTip = false
 /* eslint-disable no-new */
//这样就可以使用new创建vue对象了
var app=new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


