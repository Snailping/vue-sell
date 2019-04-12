<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseChart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props:{
      food:{
        type:Object
      }
    },
    data () {
      return {}
    },
    created () {

    },
    methods: {
      addCart(event){
        if(!event._constructed){
          return;
        }
        if(!this.food.count){
          Vue.set(this.food,'count',1);//给food一个属性count,并设置值为1
        }else{
          this.food.count++;
        }
      },
      decreaseChart(){
        if(!event._constructed){
          return;
        }
        if(this.food.count){
          this.food.count--;
        }

      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size:0
    .cart-decrease,.cart-add
      display:inline-block
      padding:6px
      line-height:24px
      font-size:24px
      color:rgb(0,160,220)
    .cart-decrease
      transform:translate3D(0,0,0) rotate(0deg)
      opacity:1
      &.move-enter,&.move-leave-to
        opacity:0
        transform:translate3d(24px,0,0) rotate(180deg)
      &.move-enter-active,&.move-leave-active
        transition:all 1s linear
    .cart-count
      display:inline-block
      vertical-align:top
      width:12px
      padding-top:6px
      line-height:24px
      text-align:center
      font-size:10px
      color:rgb(33,33,33)
    .cart-add
      display:inline-block
      padding:6px

</style>
