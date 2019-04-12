<template>
  <div class="hello">
    这是一个api示范例子
  </div>
</template>

<script>
  import ApiServer from 'api/index'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
      }
    },
    created () {
      this.getSeller()
      this.getGoods()
      this.getRatings()
    },
    methods: {
      //获取商家基本信息
      getSeller () {
        ApiServer.getSeller().then(res => {
          if (res.status === 1) {
            console.log(res)
          }
        }).catch(err => {
          console.log(err)
        })
      },


      //获取商品基本信息
      getGoods () {
        ApiServer.getGoods().then(res => {
          if (res.status === 1) {
            console.log(res)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      //获取评论基本信息
      getRatings () {
        ApiServer.getRatings().then(res => {
          if (res.status === 1) {
            console.log(res)
          }
        }).catch(err => {
          console.log(err)
        })
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
