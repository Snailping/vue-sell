<template>
  <div>
    <v-header :seller="seller"/><!--头部组件，将整个seller数据传给子组件，即header.vue-->
    <div class="tab border-1px">
      <router-link
        class="tab-item"
        tag="div"
        to="/goods"
      >
        商品
      </router-link>
      <router-link
        class="tab-item"
        tag="div"
        to="/ratings"
      >
        评论
      </router-link>
      <router-link
        class="tab-item"
        tag="div"
        to="/seller"
      >
        商家
      </router-link>
    </div>
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view :seller="seller"/>
  </div>
</template>

<script>
  import ApiServer from './api/index'  // 将数据组合的类导进来
  import Header from './components/header/header'  //将头部组件导进来


  export default {
    name: 'App',

    // name: 'app' 相当于一个全局 ID；
    // 可以不写；
    // 写了可以提供更好的调试信息（官方文档有）。
    data () {
      return {
        seller: {}
      }
    },
    created () {
      this.getSeller()
    },
    methods: {
      //获取商家基本信息
      getSeller () {
        //异步任务 ajax
        ApiServer.getSeller().then(res => {
          if (res.status === 1) {

            // console.log(res)
            this.seller = res.data
          }
        }).catch(err => {
          console.log(err)
        })
      },
    },
    components: { //头部组件，对应于上面的<v-header :seller="seller"/>
      'v-header': Header
    }
  }
</script>

<style lang="stylus">
  @import "assets/styles/mixin.styl"


  .tab
    display flex
    width 100%
    height 40px
    line-height: 40px
    border-1px(rgba(7, 17, 27, 0.1))
    //border-bottom:1px solid rgba(7,17,27,0.1)
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      flex 1
      font-size: 14px
      text-align center
      color: rgb(77, 85, 93)
      &.router-link-active
        color: rgb(240, 20, 20)
</style>
