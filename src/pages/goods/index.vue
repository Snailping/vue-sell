<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="left">
        <ul>
          <li v-for="(item,index) in goods" class="menu-item" :key="index" :class="{'current':currentIndex==index}" @click="selectMenu(index,$event)">
            <span class="text border-1px">
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="right">
        <ul>
          <li v-for="item in goods" class="food-list food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="food in item.foods" class="food-item border-1px" @click="selectFood(food,$event)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" alt="">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span>月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    </div>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import ApiServer from '../../api/index'
  import BScroll from 'better-scroll'
  import shopcart from 'components/shopcart/shopcart'
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  import food from 'components/food/food'
  export default {
    props:{
      seller:{
        type:Object
      }
    },
    data () {
      return {
        goods:[],
        listHeight:[],
        scrollY:0,
        selectedFood:{}
      }
    },
    created () {
      this.getGoods();
      this.classMap=['decrease','discount','special','invoice','guarantee']
    },
    computed:{
      currentIndex(){
        for(let i=0;i<this.listHeight.length;i++){
          let height1=this.listHeight[i];
          let height2=this.listHeight[i+1];
          if(!height2 || (this.scrollY>=height1 && this.scrollY<height2)){
            return i;
          }
        }
        return 0;
      },
      selectFoods(){
        let foods=[];
        this.goods.forEach((good)=>{
          good.foods.forEach((food)=>{
            if(food.count){
              foods.push(food);
            }
          })
        })
        return foods;
      }
    },
    methods: {
      //获取商家基本信息
      getGoods () {
        //异步任务 ajax
        ApiServer.getGoods().then(res => {
          if (res.status === 1) {
            this.goods = res.data;
            this.$nextTick(()=>{
              this._initScroll();
              this._calculateHeight();
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
      selectMenu(index,event){
          if(!event._constructed){
            return;
          }
          let foodList=this.$refs.right.getElementsByClassName('food-list-hook');
          let el=foodList[index];
          this.foodsScroll.scrollToElement(el,300);
          console.log(index)
      },
      selectFood(food,event){
        console.log(event._constructed)
        if(!event._constructed){
          return;
        }
        this.selectedFood=food;
        this.$refs.food.show();
      },
      _initScroll(){
        this.menuScroll=new BScroll(this.$refs.left,{
          click:true
        });
        this.foodsScroll=new BScroll(this.$refs.right,{
          click:true,
          probeType:3
        });
        this.foodsScroll.on('scroll',(pos)=>{
          this.scrollY=Math.abs(Math.round(pos.y));

        })
      },
      _calculateHeight(){
        let foodList=this.$refs.right.getElementsByClassName('food-list-hook');
        let height=0;
        this.listHeight.push(height);
        for(let i=0;i<foodList.length;i++){
          let item=foodList[i];
          height+=item.clientHeight;
          this.listHeight.push(height);

        }
      }

    },
    // 或者这样也行mounted(){
    //   this.$nextTick(()=>{
    //     this.menuScroll=new BScroll(this.$refs.left,{});
    //     this.foodsScroll=new BScroll(this.$refs.right,{});
    //   })
    // }
    components:{
      shopcart,
      cartcontrol,
      food
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/styles/mixin.styl";
  .goods
    display:flex
    position:absolute
    width: 100%
    top:174px
    bottom:46px
    overflow:hidden
    .menu-wrapper
      flex:0 0 80px //等分，缩放，占位像素
      width:80px
      background: #f3f5f7
      .menu-item
        display:table//这样就可以垂直居中
        height:54px
        width:56px
        line-height:14px
        padding:0 12px
        &.current
          position:relative
          z-index:10
          margin-top:-1px
          background: #ffffff
          font-weight:700
          .text
            border-none()
        .icon
          display:inline-block
          vertical-align:middle
          width:12px
          height:12px
          margin-right:4px
          background-size:12px 12px
          background-repeat:no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')

        .text
          display:table-cell
          width:56px
          vertical-align:middle
          border-1px(rgba(7,17,27,0.2))
          font-size:12px

    .foods-wrapper
      flex:1
      .title
        padding-left:14px
        height:26px
        line-height:26px
        border-left:2px solid #d9dde1
        font-size:12px
        color:rgb(147,153,159)
        background:#f3f5f7
      .food-item
        display:flex
        margin:18px
        padding-bottom:18px
        border-1px(rgba(7,17,27,0.2))
        &:last-child
          border-none()
          margin-bottom:0
        .icon
          flex:0 0 57px
          margin-right:10px
        .content
          flex:1
          .name
            margin:2px 0 8px 0
            height:14px
            line-height:14px
            font-size:14px
            color:rgb(7,17,27)
          .desc,.extra
            line-height:10px
            font-size:10px
            color:rgb(147,153,159)
          .desc
            line-height:12px
            margin-bottom:8px
          .extra
            &.count
              margin-right:12px
          .price
            font-weight:700
            line-height:24px
            .now
              margin-right:14px
              font-size:14px
              color:rgb(240,20,20)
            .old
              text-decoration:line-through
              margin-right:14px
              font-size:14px
              color:rgb(240,20,20)


          .cartcontrol-wrapper
            position:absolute
            right:0
            bottom:12px






</style>
