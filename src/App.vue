<template>
  <div id="app">
    <v-header :seller="seller"/>
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
    <router-view/>
  </div>
</template>

<script>
  import ApiServer from './api/index'
  import Header from './components/header/header'

  export default {
    name: 'App',
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
            console.log(res)
            this.seller = res.data
          }
        }).catch(err => {
          console.log(err)
        })
      },
    },
    components: {
      'v-header': Header
    }
  }
</script>

<style lang="stylus">
  @import "assets/styles/mixin.styl"

  #app
    .tab
      display flex
      width 100%
      height 40px
      line-height: 40px
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex 1
        font-size: 14px
        text-align center
        color: rgb(77, 85, 93)
        &.router-link-active
          color: rgb(240, 20, 20)
</style>
