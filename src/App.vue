<template>
  <div id="app">
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
  export default {
    name: 'App',
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
