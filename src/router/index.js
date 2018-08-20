import Vue from 'vue'
import Router from 'vue-router'
import goods from 'pages/goods'
import ratings from 'pages/ratings'
import seller from 'pages/seller'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods',
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods,
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings,
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller,
    },
  ],
})
